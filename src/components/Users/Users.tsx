import React from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import {UserType} from '../../types/types'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType} from '../../redux/users-reducer'

type PropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}: PropsType) => {
    return (
        <div>
            <div>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                           totalItemsCount={totalUsersCount} pageSize={pageSize}/>
                <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            </div>

            <div>
                {
                    users.map(u => <User user={u}
                                         followingInProgress={props.followingInProgress}
                                         unfollow={props.unfollow} follow={props.follow}/>
                    )
                }
            </div>
        </div>
    )
}

export default Users