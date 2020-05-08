import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
    follow,
    requestUsers,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
    toggleIsFetching,
    unfollow
} from '../../redux/users-reducer';
import Preloader from '../Common/Preloader/Preloader';
import Users from './Users';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from "../../redux/users-selectors";


class UsersContainer extends React.Component {

    componentDidMount() { // монтирование и запрос на сервер
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize); // вызов callback из ThunkCreator
    }

    onPageChanged = (pageNumber) => { // запрос на сервер при клике на номер страницы
        const {pageSize} = this.props
        this.props.requestUsers(pageNumber, pageSize);
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