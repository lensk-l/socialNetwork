import React from "react";
import {connect} from "react-redux";
import FBar from "./FrendsBar";

let mapState = (state) => {
    return {
        friends: state.sidebar.friends
    }
}


const FBarContainer = connect(mapState)(FBar)

export default FBarContainer;