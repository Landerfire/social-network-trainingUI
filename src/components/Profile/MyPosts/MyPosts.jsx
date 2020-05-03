import React from 'react';
import { Field, reduxForm } from "redux-form";
import s from './MyPosts.module.scss';
import Post from './Post/Post';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form action="" onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} placeholder={"Let's post something"} validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm)


const MyPosts = React.memo(props => {
    console.log("RENDER");
    
    let postsElements = props.posts.map(p => <Post
        message={p.message}
        likesCount={p.likesCount} />)

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.posts__block}>
            <h3>My Posts</h3>
            <div>
                <AddNewPostFormRedux onSubmit={onAddPost} />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div >
    )
});

export default MyPosts;