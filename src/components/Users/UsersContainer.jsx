import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader";
import {
    followThunk, getUsersThunkCreator, onCurrentPage
    , onNextPage, onPrevPage, unfollowThunk,
} from "../../redux/usersReducer";
import {compose} from "redux";
import {
    getCurrentPage,
    getEndPage, getFollowingInProgress, getIsFetching,
    getPageSize,
    getStartPage,
    getTotalUsersCount,
    getUsers
} from "../../redux/userSelector";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                startPage={this.props.startPage}
                endPage={this.props.endPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                onPrevPage={this.props.onPrevPage}
                onNextPage={this.props.onNextPage}
                currentPage={this.props.currentPage}
                followingInProgress={this.props.followingInProgress}
                unfollowThunk={this.props.unfollowThunk}
                followThunk={this.props.followThunk}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        startPage: getStartPage(state),
        endPage: getEndPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}



export default compose(
    connect(mapStateToProps, {onCurrentPage, onNextPage, onPrevPage,
        getUsers: getUsersThunkCreator, unfollowThunk, followThunk}),
)(UsersContainer);