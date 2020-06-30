import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorisedUserId; // or 6581
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId); // thunk
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     savePhoto={this.props.savePhoto}
                     updateStatus={this.props.updateStatus} />
        )
    }
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorisedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});

let mapDispatchToProps = {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ProfileContainer);