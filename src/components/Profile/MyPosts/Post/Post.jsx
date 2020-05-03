import React from 'react';
import s from './Post.module.scss';

const Post = (props) => {

    // console.log(props.message);

    return (
        <div className={s.item}>
            <img src="https://www.meme-arsenal.com/memes/7bdea6754f999b50e9577596f09197fb.jpg" alt="" />
            {props.message}
            <div>
                <button>like</button> <span>{props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post;