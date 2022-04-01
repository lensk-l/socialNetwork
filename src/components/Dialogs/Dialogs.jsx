import React from "react";
import style from './dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Messages from "./MessageItem/Message";
import {Navigate} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControl/FormsControl";
import {maxLengthCreator, requiredFields} from "../../utils/validators/validators";


const Dialogs = (props) => {

    let dialogsItem = props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
    let messageItem = props.messages.map(message => <Messages name={message.name} message={message.message}/>)

    let addNewMessage = (values) => {
        props.sendMessage(values.textOfMessage)
    }

    if (!props.isAuth) return <Navigate replace to="/login"/>


    return (
        <div className={style.content}>
            <div className={style.dialogs}>
                {dialogsItem}
            </div>
            <div className={style.messages}>
                {messageItem}
                <div className="form-div">
                    <MessageReduxForm onSubmit={addNewMessage}/>
                </div>
            </div>
        </div>
    );
}

const maxLength20 = maxLengthCreator(20);

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'textOfMessage'}
                       component={Textarea}
                       validate={[requiredFields, maxLength20 ]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
const MessageReduxForm = reduxForm({form: 'messageForm'})(MessageForm)

export default Dialogs;