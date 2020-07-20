import {authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS'


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, // if null, then captcha is not required
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }
}

// ACTION_CREATORS //
type ActionTypes = SetAuthUserDataActionType | GetCaptchaActionType

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type GetCaptchaActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})

// THUNKS //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.authMe()
        if (data.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):
    ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes | FormAction> => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === ResultCodesEnum.Success) {
            // success, get auth data
            dispatch(getAuthUserData());
        } else {
            if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}));
        }
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer