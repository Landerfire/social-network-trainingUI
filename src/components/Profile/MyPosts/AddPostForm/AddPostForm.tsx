import {InjectedFormProps, reduxForm} from "redux-form"
import {maxLengthCreator, required} from "../../../../utils/validators/validators"
import {createField, GetStringKeys, Textarea} from "../../../Common/FormsControls/FormsControls"
import React from "react"


type CurrentProps = {}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesKeys = GetStringKeys<AddPostFormValuesType>


const maxLength30 = maxLengthCreator(30)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, CurrentProps> & CurrentProps> = (props) => {

    return (
        <form action="" onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesKeys>(
                    "Let's post something", "newPostText", [required, maxLength30], Textarea)}
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, CurrentProps>({form: "ProfileAddNewPostForm"})(AddPostForm)