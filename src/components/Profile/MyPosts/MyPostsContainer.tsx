import {addPost} from '../../../redux/profile-reducer'
import MyPosts, {MapDispatchPropsType, MapStatePropsType} from './MyPosts'
import {connect} from 'react-redux'
import {AppStateType} from "../../../redux/redux-store"


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

let mapDispatchToProps = {
    addPost
}

const MyPostsContainer =
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
        mapStateToProps, mapDispatchToProps)(MyPosts)


export default MyPostsContainer