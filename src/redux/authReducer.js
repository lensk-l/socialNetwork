import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_LOGIN_DATA = 'auth/SET_LOGIN_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.userData,
            }
        case SET_LOGIN_DATA:
            return {
                ...state,
                ...action.userData,
            }
        default:
            return state;
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    userData: {userId, email, login, isAuth}
});
export const setLoginData = (formData) => ({type: SET_LOGIN_DATA, formData})


export const isAuthThunk = () => {
    return (dispatch) => {
        return authAPI.isAuth()
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, email, login} = data.data
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
    }
}

export const logInThunk = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.logeIn(email, password, rememberMe);

    if (response.data.resultCode === 0) {
        dispatch(isAuthThunk());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}));
    }

}

export const logeOutThunk = () => async (dispatch) => {
    let response = await authAPI.logeOut();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;