import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {logInThunk} from "../../redux/authReducer";
import {InputLogin} from "../common/FormsControl/FormsControl";
import {requiredFields} from "../../utils/validators/validators";
import {Navigate} from "react-router-dom";


const LoginForm = (props) => {
    return (

        <form onSubmit={props.handleSubmit}>
            <div><Field name={'email'} validate={[requiredFields]} type={"text"} placeholder={'email'}
                        component={InputLogin}/></div>
            <div><Field name={'password'} validate={[requiredFields]} type={"password"} placeholder={'password'}
                        component={InputLogin}/></div>
            <div><Field name={'rememberMe'} type={"checkbox"} placeholder={'password'} component={'input'}/> remember me
            </div>
            <div>
                <div>{props.error}</div>
                <button>LogIn</button>
            </div>

        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {

    const onSubmit = (formData) => {
        props.logInThunk(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }


    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});


const LoginContainer = connect(mapStateToProps, {logInThunk})(Login);
export default LoginContainer;
