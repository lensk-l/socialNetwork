import {profileApi, usersApi,} from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const UPDATE_PHOTO = 'profile/UPDATE_PHOTO'

let initialState = {
    postsData: [
        {id: 1, message: 'It\'s my first post', likesCount: 0},
        {id: 2, message: 'my message', likesCount: 0},
        {id: 3, message: 'call me back', likesCount: 0},
        {id: 4, message: 'love you', likesCount: 0},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.postText,
                likesCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        }
        case UPDATE_PHOTO: {
            return{...state, profile: {...state.profile, photos: action.photos}}}

        default:
            return state;
    }

}

export const addPost = (postText) => ({type: ADD_POST, postText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setUserStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const savePhotoSuccess = (photos) => ({type: UPDATE_PHOTO, photos})



export const getProfileThunk = (userId) => async (dispatch) => {
    let response = await profileApi.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getUserStatusThunk = (userId) => async (dispatch) => {
    let response = await profileApi.getStatus(userId);
    dispatch(setUserStatus(response.data));
}

export const updateStatusThunk = (status) => async (dispatch) => {
    let response = await profileApi.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}
export const savePhoto = (file) => async(dispatch) => {
    let response = await profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }

}

export default profileReducer;