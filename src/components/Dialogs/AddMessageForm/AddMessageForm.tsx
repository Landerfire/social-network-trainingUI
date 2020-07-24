import {maxLengthCreator, required} from "../../../utils/validators/validators"
import {InjectedFormProps, reduxForm} from "redux-form"
import {createField, Textarea} from "../../Common/FormsControls/FormsControls"
import React from "react"
import {NewMessageFormValuesType} from "../Dialogs"

type CustomProps = {}
type NewMessageFormTypeKeys = keyof NewMessageFormValuesType

const maxLength100 = maxLengthCreator(100)

const AddMessageForm: React.FC<CustomProps & InjectedFormProps<NewMessageFormValuesType, CustomProps>> = (props) => {
    return (
        <form action="" onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormTypeKeys>("Enter yor message", "newMessageBody", [required, maxLength100], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, CustomProps>({form: 'dialogAddMessageForm'})(AddMessageForm)
