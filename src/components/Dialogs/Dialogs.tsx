import React from 'react'
import s from './Dialogs.module.scss'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {InitialStateType} from "../../redux/dialogs-reducer"
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm"
import {InjectedFormProps} from "redux-form";


type CustomProps = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
    newMessageBody: string
    clearMessageForm: (form: string) => void
}
export type NewMessageFormValuesType = {
    newMessageBody: string
}


const Dialogs: React.FC<CustomProps & InjectedFormProps<{}, CustomProps>> = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    )
}

export default Dialogs