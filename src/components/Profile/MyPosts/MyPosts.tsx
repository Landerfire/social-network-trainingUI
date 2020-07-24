import React from 'react'
import s from './MyPosts.module.scss'
import Post from './Post/Post'
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm"
import {PostsType} from "../../../types/types"


type CurrentProps = {}
export type MapStatePropsType = {
    posts: Array<PostsType>
}
export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
type PropsType = CurrentProps & MapStatePropsType & MapDispatchPropsType


const MyPosts: React.FC<PropsType> = (props) => {
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.posts__block}>
            <h3>My Posts</h3>
            <div>
                <AddPostForm onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo