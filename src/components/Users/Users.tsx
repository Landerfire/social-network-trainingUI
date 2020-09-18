import React, {useEffect} from 'react'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import {UsersSearchForm} from './UsersSearchForm'
import {FilterType, follow, requestUsers, unfollow} from '../../redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
   getCurrentPage,
   getFollowingInProgress,
   getPageSize,
   getTotalUsersCount,
   getUsers,
   getUsersFilter
} from '../../redux/users-selectors'
import {useHistory} from 'react-router-dom'
import * as queryString from 'querystring'


type QueryParamsType = { term?: string, page?: string, friend?: string }
type PropsType = {}


export const Users: React.FC<PropsType> = (props) => {

   // Props
   const users = useSelector(getUsers)
   const totalUsersCount = useSelector(getTotalUsersCount)
   const currentPage = useSelector(getCurrentPage)
   const pageSize = useSelector(getPageSize)
   const filter = useSelector(getUsersFilter)
   const followingInProgress = useSelector(getFollowingInProgress)

   const history = useHistory()
   const dispatch = useDispatch()
   const search = history.location.search

   useEffect(() => {
      const parsed = queryString.parse(search.substr(1)) as QueryParamsType

      let actualPage = currentPage
      let actualFilter = filter

      if (!!parsed.page) actualPage = Number(parsed.page)

      if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

      switch (parsed.friend) {
         case 'null':
            actualFilter = {...actualFilter, friend: null}
            break
         case 'true':
            actualFilter = {...actualFilter, friend: true}
            break
         case 'false':
            actualFilter = {...actualFilter, friend: false}
            break
      }

      dispatch(requestUsers(actualPage, pageSize, actualFilter))
   }, [])

   useEffect(() => {
      const query: QueryParamsType = {}

      if (!!filter.term) query.term = filter.term
      if (filter.friend !== null) query.friend = String(filter.friend)
      if (currentPage !== 1) query.page = String(currentPage)

      history.push({
         pathname: '/users',
         search: queryString.stringify(query),
      })
   }, [history, filter, currentPage])

   // Dispatches
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