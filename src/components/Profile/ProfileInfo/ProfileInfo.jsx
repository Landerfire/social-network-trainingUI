import React from 'react';
import s from './ProfileInfo.module.scss';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';

const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto}) => {
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={s.description__block}>
                <img src={profile.photos.large || userPhoto} alt={"Низагружаица"} className={s.mainPhoto} />
                <div>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                </div>
                <div className={s.status}>
                    <p>Статус:</p>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                </div>
                <div className={s.description}>
                    <p>{profile.aboutMe}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;