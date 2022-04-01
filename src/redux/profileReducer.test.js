import profileReducer, {addPost, deletePost} from "./profileReducer";
import React from "react";

let state = {
    postsData: [
        {id: 1, message: 'It\'s my first post', likesCount: 0},
        {id: 2, message: 'my message', likesCount: 0},
        {id: 3, message: 'call me back', likesCount: 0},
        {id: 4, message: 'love you', likesCount: 0},
    ]
};

test('new post should be added', () => {
    //1. test data
    let action = addPost('some text of new post');


    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.postsData.length).toBe(5);
});

test('match of new post text', () => {
    //1. test data
    let action = addPost('some text of new post');

    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.postsData[4].message).toBe('some text of new post')
});

test('after deleting length should be incremented', () => {
    //1. test data
    let action = deletePost(1);

    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.postsData.length).toBe(3);
});
