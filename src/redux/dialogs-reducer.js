const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Let's go some shoping" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" },
        { id: 6, message: "Yo" },
    ],
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Valera' },
    ],
    newMessageBody: "",
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            let newMessage = {
                id: 7,
                message: body
            }

            return {
                ...state,
                newMessageBody: "",
                messages: [...state.messages, newMessage]
            };
            // stateCopy.messages.push(newMessage);
            // stateCopy.newMessageBody = "";
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };
            // stateCopy.newMessageBody = action.body;
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;



/* было из store

if (action.type === SEND_MESSAGE) {
    let newMessage = {
        id: 7,
        message: this._state.dialogsPage.newMessageBody,
    }
    this._state.dialogsPage.messages.push(newMessage);
    this._state.dialogsPage.newMessageBody = "";
    this._callSubscriber(this._state);
}
else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
    this._state.dialogsPage.newMessageBody = action.body;
    this._callSubscriber(this._state);
}

*/