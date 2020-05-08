import React from 'react';
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, portionSize, ...props}) => {
    return (
        <div>
            <div>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                           totalItemsCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize} />
            </div>

            <div>
                {
                    users.map(u => <User user={u}
                                         key={u.id}
                                         followingInProgress={props.followingInProgress}
                                         unfollow={props.unfollow} follow={props.follow} />
                    )
                }
            </div>
        </div>
    )
}

export default Users;