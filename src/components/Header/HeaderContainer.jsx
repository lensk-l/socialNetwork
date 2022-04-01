import React from "react";
import "./header.css"
import Header from "./Header";
import {connect} from "react-redux";
import {logeOutThunk} from "../../redux/authReducer";


class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props}/>
    }

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login

})
export default connect(mapStateToProps, {logeOutThunk})(HeaderContainer);