import React from 'react'
import {connect, Provider} from 'react-redux'
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import './App.scss'
import Preloader from './components/Common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'
import {LoginPage} from './components/Login/LoginPage'
import Music from './components/Music/Music'
import Navbar from './components/Navbar/Navbar'
import News from './components/News/News'
import Settings from './components/Settings/Settings'
import {UsersPage} from './components/Users/UsersContainer'
import {initializeApp} from './redux/app-reducer'
import store, {AppStateType} from './redux/redux-store'
import {withSuspense} from './hoc/withSuspense'


const DialogsContainer = React.lazy(() => import(`./components/Dialogs/DialogsContainer`))
const ProfileContainer = React.lazy(() => import(`./components/Profile/ProfileContainer`))

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = { initializeApp: () => void }


const SuspendedDialogsPage = withSuspense(DialogsContainer)
const SuspendedProfilePage = withSuspense(ProfileContainer)
const SuspendedLoginPage = withSuspense(LoginPage)


class App extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
   catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
      alert('Some Error Acquired')
   }

   componentDidMount() {
      this.props.initializeApp()
      // обработчик ошибок
      window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
   }

   componentWillUnmount() {
      window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
   }

   render() {
      if (!this.props.initialized) {
         return <Preloader/>
      }

      return (
         <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper__content">

               <Switch>
                  <Route exact path="/" render={() => <Redirect to="/Profile"/>}/>

                  <Route path="/profile/:userId?" render={() => <SuspendedProfilePage/>}/>
                  <Route path="/dialogs" render={() => <SuspendedDialogsPage/>}/>
                  <Route path="/news" render={() => <News/>}/>
                  <Route path="/music" render={() => <Music/>}/>
                  <Route path="/settings" render={() => <Settings/>}/>
                  <Route path="/users" render={() => <UsersPage pageTitle={'Самураи'}/>}/>

                  <Route path="/login" render={() => <SuspendedLoginPage/>}/>

                  <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
               </Switch>
            </div>
         </div>
      )
   }
}


const mapStateToProps = (state: AppStateType) => ({
   initialized: state.app.initialized,
})

const AppContainer = compose<React.ComponentType>(
   withRouter,
   connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp: React.FC = () => {
   return <HashRouter>
      <Provider store={store}>
         <AppContainer/>
      </Provider>
   </HashRouter>
}

export default SamuraiJSApp