import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";

let state = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 9},
        {id: 3, message: "Do u know da way?", likesCount: 1},
        {id: 4, message: "Get over here!", likesCount: 99},
    ]
};

test('length of posts should be incremented', () => {

    // 1. Готовим исходные данные. Test Data
    let action = addPostActionCreator("It-Kama");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.posts.length).toBe(5);
});

test('message of new post should be correct', () => {

    // 1. Готовим исходные данные. Test Data
    let action = addPostActionCreator("It-Kama");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.posts[4].message).toBe("It-Kama");
});

test('after deleting length of posts should be decrement', () => {

    // 1. Готовим исходные данные. Test Data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.posts.length).toBe(3);
});

test("after deleting length of posts shouldn't be decrement if id is incorrect", () => {

    // 1. Готовим исходные данные. Test Data
    let action = deletePost(1000);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.posts.length).toBe(4);
});