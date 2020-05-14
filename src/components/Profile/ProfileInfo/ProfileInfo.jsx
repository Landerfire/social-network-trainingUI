import React, {useState} from 'react';
import s from './ProfileInfo.module.scss';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);


    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        const promise = saveProfile(formData);
        promise.then(
            () => {
                setEditMode(false);
            }
        )
    }

    return (
        <div className={s.profileInfoBlock}>
            <div className={s.mainInfoBlock}>
                <div className={s.userName}>
                    {profile.fullName}
                </div>
                <div className={s.status}>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                </div>
            </div>

            <div className={s.profilePhotoBlock}>
                <img src={profile.photos.large || userPhoto} alt={"Низагружаица"} className={s.mainPhoto} />
                <div>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                </div>
            </div>

            {editMode
                ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                    setEditMode(true)
                }} />}

            <ProfileContacts profile={profile} />

        </div>
    )
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div className={s.descriptionBlock}>
        {isOwner &&
        <div>
            <button onClick={goToEditMode}>Edit</button>
        </div>}
        <div className={s.userJob}>
            <b>Looking for a job</b>:
            <p>{profile.lookingForAJob ? "Yes" : "Nope"}</p>
        </div>

        {profile.lookingForAJob &&
        <div className={s.userProfessionalSkills}>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }

        <div className={s.description}>
            <b>About Me</b>: {profile.aboutMe}
        </div>
    </div>
}

const ProfileContacts = ({profile}) => {
    return <div className={s.contactsInfoBlock}>
        <p><b>Contacts</b>:</p>
        <div className={s.contacts}>
            {Object.keys(profile.contacts).map(key => {
                return <Contact contactId={key} key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
        </div>
    </div>
}


const Contact = ({contactTitle, contactValue, contactId}) => {
    return <div>
        {contactValue &&
        <a id={contactId} href={contactValue} target="_blank" rel="noopener noreferrer">{contactTitle}</a>
        }
    </div>
}

export default ProfileInfo;