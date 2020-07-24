import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {logout} from '../../redux/auth-reducer'
import {AppStateType} from "../../redux/redux-store"

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    logout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType


class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps, {logout}
)(HeaderContainer)