import React from 'react';
import s from "./ProfileInfo.module.scss";
import {createField, Input, Textarea} from "../../Common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";
import style from "../../Common/FormsControls/FormsControls.module.scss";

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>

            {error && <div className={style.formSummaryError}>
                {error}
            </div>}

            <div>
                <b>Full Name</b>: {createField("Full name", "fullName", [required], Input )}
            </div>
            <div className={s.userJob}>
                <b>Looking for a job</b>: {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>

            <div className={s.userProfessionalSkills}>
                <b>My professional skills</b>: {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>

            <div className={s.description}>
                <b>About Me</b>: {createField("About Me", "aboutMe", [], Input)}
            </div>

            <div className={s.contacts}>
                {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={s.contact}>
                        <b>{key}</b>: {createField(key, "contacts." + key, [], Input )}
                    </div>
                })}
            </div>
        </form>
    );
}

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataReduxForm;