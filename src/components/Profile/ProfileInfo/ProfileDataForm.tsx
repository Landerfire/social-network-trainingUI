import React from 'react'
import s from "./ProfileInfo.module.scss"
import {createField, GetStringKeys, Input, Textarea} from "../../Common/FormsControls/FormsControls"
import {InjectedFormProps, reduxForm} from "redux-form"
import {required} from "../../../utils/validators/validators"
import style from "../../Common/FormsControls/FormsControls.module.scss"
import {ProfileType} from "../../../types/types"


type CurrentProps = {
    profile: ProfileType
}

type ProfileDataFormValuesKeys = GetStringKeys<ProfileType>


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, CurrentProps> & CurrentProps> = (
    {profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}

            <div>
                <b>Full Name</b>:
                {createField<ProfileDataFormValuesKeys>("Full name", "fullName", [required], Input)}
            </div>
            <div className={s.userJob}>
                <b>Looking for a job</b>:
                {createField<ProfileDataFormValuesKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>

            <div className={s.userProfessionalSkills}>
                <b>My professional skills</b>:
                {createField<ProfileDataFormValuesKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>

            <div className={s.description}>
                <b>About Me</b>: {createField<ProfileDataFormValuesKeys>("About Me", "aboutMe", [], Input)}
            </div>

            <div className={s.contacts}>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}>
                        {/*todo: create type for contacts field*/}
                        <b>{key}</b>: {createField(key, "contacts." + key, [], Input)}
                    </div>
                })}
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, CurrentProps>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm