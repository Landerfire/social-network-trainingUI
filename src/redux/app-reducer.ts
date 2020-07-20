import {getAuthUserData} from "./auth-reducer"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


let initialState = {
    initialized: false,
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

// ACTION_CREATORS //
type ActionTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS //  "INITIALIZED_SUCCESS"
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})


// THUNKS //

export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionTypes> => (dispatch) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}


export default appReducer