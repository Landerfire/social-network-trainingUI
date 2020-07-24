import {BaseThunkType, InferActionsTypes} from "./redux-store";


type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    messages: [
        {id: 1, message: "Hi!"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "Let's go some shoping"},
        {id: 4, message: "Yo"},
        {id: 5, message: "Yo"},
        {id: 6, message: "Yo"},
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'},
    ] as Array<DialogType>,
}

export type InitialStateType = typeof initialState


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/DIALOGS/SEND_MESSAGE":
            let body = action.newMessageBody
            let newMessage = {
                id: 7,
                message: body
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            }
        // stateCopy.messages.push(newMessage);
        // stateCopy.newMessageBody = "";
        default:
            return state
    }
}

// ACTION_CREATORS //
type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({type: "SN/DIALOGS/SEND_MESSAGE", newMessageBody} as const),
}
// =========== //


// THUNKS //
type ThunkType = BaseThunkType<ActionsTypes>

export const sendMessage = (newMessageBody: string): ThunkType => async (dispatch) => {
    dispatch(actions.sendMessageCreator(newMessageBody))
}
// =========== //


export default dialogsReducer