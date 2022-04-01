import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {useMatch, Navigate} from "react-router-dom";
import {getProfileThunk, getUserStatusThunk, savePhoto, updateStatusThunk} from "../../redux/profileReducer";
import {compose} from "redux";


export const withRouter = (Component) => {

    let RouterComponent = (props) => {

        let match = useMatch('/profile/:userId');
        return <Component {...props} match={match}/>;
    }

    return RouterComponent;
}


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId;
        if (this.props.match == null) {
            userId = this.props.authPersonId;
            this.props.getProfileThunk(userId);
            this.props.getUserStatusThunk(userId)
        }
        if (this.props.match != null) {
            userId = this.props.match.params.userId;
            this.props.getProfileThunk(userId);
            this.props.getUserStatusThunk(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       // this.refreshProfile()
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={this.props.match}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatusThunk}
                     savePhoto={this.props.savePhoto}
            />
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authPersonId: state.auth.userId,
})


export default compose(
    connect(mapStateToProps, {getProfileThunk, getUserStatusThunk, updateStatusThunk, savePhoto}),
    withRouter,
)(ProfileContainer);