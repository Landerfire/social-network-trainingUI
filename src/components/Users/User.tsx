import React from 'react'
import style from './Users.module.scss'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from 'react-router-dom'
import {UserType} from "../../types/types"

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let User = ({user, followingInProgress, follow, unfollow}: PropsType) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={style.userPhoto}
                             src={user.photos.small != null ? user.photos.small : userPhoto} alt=""/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button
                            disabled={followingInProgress.some(id => id === user.id)} // если в массиве хоть один id = user.id, тогда true
                            onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow
                        </button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>Follow
                        </button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>
    )
}

export default User