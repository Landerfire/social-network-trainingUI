import React, {useState} from 'react';
import s from './ProfileInfo.module.scss';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';
import vk from '../../../assets/images/vk.svg';
import facebook from '../../../assets/images/facebook.svg';
import github from '../../../assets/images/github.svg';
import instagram from '../../../assets/images/instagram.svg';
import twitter from '../../../assets/images/twitter.svg';
import youtube from '../../../assets/images/youtube.svg';
import website from '../../../assets/images/website.png';
import mainlink from '../../../assets/images/mainlink.png';

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
                return <Contact contactId={key} iconName={key} key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })}
        </div>
    </div>
}

const iconSort = (iconName) => {
    const icon = (iconPath, iconName, title) => {
        return <img className={s.contactIcon} src={iconPath} alt={iconName} title={title} />
    }
    switch (iconName) {
        case "facebook": {
            let [title, iconPath] = ["facebook.com", facebook];
            return icon(iconPath, iconName, title);
        }
        case "website": {
            let [title, iconPath] = ["My website", website];
            return icon(iconPath, iconName, title);
        }
        case "vk": {
            let [title, iconPath] = ["vk.com", vk];
            return icon(iconPath, iconName, title);
        }
        case "twitter": {
            let [title, iconPath] = ["twitter.com", twitter];
            return icon(iconPath, iconName, title);
        }
        case "instagram": {
            let [title, iconPath] = ["instagram.com", instagram];
            return icon(iconPath, iconName, title);
        }
        case "youtube": {
            let [title, iconPath] = ["youtube.com", youtube];
            return icon(iconPath, iconName, title);
        }
        case "github": {
            let [title, iconPath] = ["github.com", github];
            return icon(iconPath, iconName, title);
        }
        case "mainLink": {
            let [title, iconPath] = ["Main Link", mainlink];
            return icon(iconPath, iconName, title);
        }
        default: {
            return undefined
        }
    }
}


const Contact = ({contactTitle, contactValue, contactId, iconName}) => {
    return <div>
        {contactValue &&
        <a className={s.contact} id={contactId} href={contactValue} target="_blank" rel="noopener noreferrer">
            {/*{contactTitle}*/}
            {iconSort(iconName)}
        </a>
        }
    </div>
}

export default ProfileInfo;