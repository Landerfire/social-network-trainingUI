import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
    posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 9 },
        { id: 3, message: "Do u know da way?", likesCount: 1 },
        { id: 4, message: "Get over here!", likesCount: 99 },
    ],
    newPostText: "",
    profile: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                newPostText: "",
                posts: [...state.posts, newPost]
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }

        default:
            return state;
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST });
// если функция возвращает лишь одну строку, мы можем убрать return и фигурные скобки, но нужно обернуть объект в круглые скобки
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const getUserProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId).then(data => {
        dispatch(setUserProfile(data));
    });
}

export default profileReducer;

/* было перенесено из store

if (action.type === ADD_POST) {
    let newPost = {
        id: 5,
        message: this._state.profilePage.newPostText,
        likesCount: 0
    }
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber(this._state);
}
else if (action.type === UPDATE_NEW_POST_TEXT) {
    this._state.profilePage.newPostText = action.newText;
    this._callSubscriber(this._state);
}

*/
