import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
    follow, requestUsers, setCurrentPage,
    setTotalUsersCount, setUsers, toggleFollowingProgress,
    toggleIsFetching, unfollow
} from '../../redux/users-reducer';
import Preloader from '../Common/Preloader/Preloader';
import Users from './Users';
import {
    getUsers, getPageSize, getTotalUsersCount,
    getCurrentPage, getIsFetching, getFollowingInProgress,
} from "../../redux/users-selectors";


class UsersContainer extends React.Component {

    componentDidMount() { // монтирование и запрос на сервер
        this.props.requestUsers(this.props.currentPage, this.props.pageSize); // вызов callback из ThunkCreator
    }

    onPageChanged = (pageNumber) => { // запрос на сервер при клике на номер страницы
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                />
            </>
        )
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

let mapDispatchToProps = {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress,
    requestUsers,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer)