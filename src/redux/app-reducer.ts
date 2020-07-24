import {getAuthUserData} from "./auth-reducer"
import {ThunkAction} from "redux-thunk"
import {AppStateType, InferActionsTypes} from "./redux-store"


let initialState = {
    initialized: false,
}

type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}


// ACTION_CREATORS //

type ActionTypes = InferActionsTypes<typeof actions>

const actions = {
    initializedSuccess: () => ({type: "SN/APP/INITIALIZED_SUCCESS"} as const),
}


// THUNKS //

export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionTypes> => (dispatch) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}


export default appReducer