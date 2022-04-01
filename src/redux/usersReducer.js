import {usersApi} from "../api/api";

const FOLLOW = 'user/FOLLOW';
const UNFOLLOW = 'user/UNFOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'user/SET_TOTAL_COUNT';
const ON_NEXT_PAGE = 'user/ON_NEXT_PAGE';
const ON_PREV_PAGE = 'user/ON_PREV_PAGE';
const TOGGLE_IS_FETCHED = 'user/TOGGLE_IS_FETCHED';
const TOGGLE_IS_FOLL_PROGRESS = 'user/TOGGLE_IS_FOLL_PROGRESS';

let initialState = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    startPage: 1,
    endPage: 8,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USERS:
            return {
                ...state, usersData: action.users
            }

        case SET_TOTAL_COUNT:
            return {
                ...state, totalUsersCount: action.totalCount
            }

        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage,
            }
        case ON_NEXT_PAGE:
            if (state.startPage > 0 && state.endPage < (state.totalUsersCount / state.pageSize)) {
                return {
                    ...state,
                    startPage: state.startPage + 1,
                    endPage: state.endPage + 1,
                }
            }
            return state

        case ON_PREV_PAGE:
            if (state.startPage > 1 && state.endPage < (state.totalUsersCount / state.pageSize)) {
                return {
                    ...state,
                    startPage: state.startPage - 1,
                    endPage: state.endPage - 1,
                }
            }
            return state

        case TOGGLE_IS_FETCHED:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_IS_FOLL_PROGRESS : {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
            }
        }

        default:
            return state;
    }

}


export const onFollowClick = (userId) => ({type: FOLLOW, userId});
export const onUnfollowClick = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount});
export const onCurrentPage = (newCurrentPage) => ({type: SET_CURRENT_PAGE, newCurrentPage});
export const onNextPage = () => ({type: ON_NEXT_PAGE});
export const onPrevPage = () => ({type: ON_PREV_PAGE});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHED, isFetching});
export const toggleFollInProg = (isFetching, userId) => ({type: TOGGLE_IS_FOLL_PROGRESS, isFetching, userId});


export const getUsersThunkCreator = (requestedPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(onCurrentPage(requestedPage));

    let data = await usersApi.getUsers(requestedPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
}


export const unfollowThunk = (userId) => async (dispatch) => {
    dispatch(toggleFollInProg(true, userId))
    let data = await usersApi.unfollow(userId)
    if (data.resultCode === 0) {
        dispatch(onUnfollowClick(userId))
    }
    dispatch(toggleFollInProg(false, userId))
}

export const followThunk = (userId) => async (dispatch) => {
    dispatch(toggleFollInProg(true, userId));
    let data = usersApi.follow(userId)
    if (data.resultCode === 0) {
        dispatch(onFollowClick(userId));
    }
    dispatch(toggleFollInProg(false, userId));
}


export default usersReducer;