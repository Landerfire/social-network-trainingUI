import React from 'react';
import style from './Users.module.scss';
import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize ); // округляем значение в большую сторону
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div className={style.pages}>
                {pages.map(p => {
                    return <span className={props.currentPage === p ? style.selectedPage : ""}  // то же что{props.currentPage === p && style.selectedPage}
                        onClick={(event) => { props.onPageChanged(p) }}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img className={style.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto} alt="" />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} // если в массиве хоть один id = u.id, тогда true
                                    onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.follow(u.id) }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;