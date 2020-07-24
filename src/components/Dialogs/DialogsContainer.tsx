import {sendMessage} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from 'redux'
import {AppStateType} from "../../redux/redux-store"
import React from "react"

let mapStateToProps = (state: AppStateType) => { // для данных из state. Уже сразу state = getState();
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage}),
    withAuthRedirect
)(Dialogs)