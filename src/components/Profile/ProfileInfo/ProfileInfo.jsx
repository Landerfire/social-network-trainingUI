import React from 'react';
import s from './ProfileInfo.module.scss';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader />
    }

    return (
        <div>
            <div className={s.description__block}>
                <img src={profile.photos.large} alt="" />
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