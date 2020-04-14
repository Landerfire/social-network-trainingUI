import React from 'react';
import s from './MyPosts.module.scss';
import Post from './Post/Post';

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post
        message={p.message}
        likesCount={p.likesCount} />)

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={s.posts__block}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                        ref={newPostElement}
                        value={props.newPostText}
                        placeholder='Post something' />
                </div>
                <button onClick={onAddPost}>Add Post</button>
                <button>Remove</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div >
    )
}

export default MyPosts;