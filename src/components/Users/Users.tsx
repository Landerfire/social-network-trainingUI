import React, {useEffect} from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, requestUsers, follow, unfollow} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
   getCurrentPage,
   getFollowingInProgress,
   getPageSize,
   getTotalUsersCount,
   getUsers,
   getUsersFilter
} from '../../redux/users-selectors'


type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

   // Props
   const users = useSelector(getUsers)
   const totalUsersCount = useSelector(getTotalUsersCount)
   const currentPage = useSelector(getCurrentPage)
   const pageSize = useSelector(getPageSize)
   const filter = useSelector(getUsersFilter)
   const followingInProgress = useSelector(getFollowingInProgress)


   // Dispatch
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(requestUsers(currentPage, pageSize, filter))
   }, []) // == ComponentDidMount

   const onPageChanged = (pageNumber: number) => {
      dispatch(requestUsers(pageNumber, pageSize, filter))
   }
   const onFilterChanged = (filter: FilterType) => {
      dispatch(requestUsers(1, pageSize, filter))
   }
   const followThunk = (userId: number) => {
      dispatch(follow(userId))
   }
   const unfollowThunk = (userId: number) => {
      dispatch(unfollow(userId))
   }


   return (
      <div>
         <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
         </div>

         <div>
            {
               users.map(u => <User user={u}
                                    followingInProgress={followingInProgress}
                                    unfollow={unfollowThunk} follow={followThunk}/>
               )
            }
         </div>
      </div>
   )
}