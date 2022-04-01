import React from "react";
import { addPost} from "../../../redux/profileReducer";
import MyPost from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postsData,
    }
}


const MyPostContainer = connect(mapStateToProps, {addPost})(MyPost);

export default MyPostContainer;