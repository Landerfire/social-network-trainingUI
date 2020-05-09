import React, {Suspense} from 'react';
import {connect, Provider} from 'react-redux';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import './App.scss';
import Preloader from './components/Common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import {initializeApp} from './redux/app-reducer';
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";


const DialogsContainer = React.lazy(() => import((`./components/Dialogs/DialogsContainer`)));
const ProfileContainer = React.lazy(() => import((`./components/Profile/ProfileContainer`)));


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-wrapper__content">
                    <Suspense fallback={<div><Preloader /></div>}>
                        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                        {/*<Route path="/dialogs" render={() => <DialogsContainer />} />*/}
                    </Suspense>
                    <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
                    <Route path="/news" render={withSuspense(News)} />
                    <Route path="/music" component={Music} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/users" render={() => <UsersContainer />} />
                    <Suspense fallback={<div><Preloader /></div>}>
                        <Route path="/login" render={() => <LoginPage />} />
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

const SamuraiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;