import './myPosts.css'
import Post from "./Post/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredFields} from "../../../utils/validators/validators";
import {Input} from "../../common/FormsControl/FormsControl";


function MyPost(props) {

    let postItem = props.postData.map(post => <Post message={post.message} key={post.id}/>)

    let onSendPost = (values) => {
        props.addPost(values.postText)
    }

    return (

        <div className="post">
            <h3>My post</h3>
            <SendPostForm onSubmit={onSendPost}/>
            {postItem}
        </div>
    );
}

const maxLength10 = maxLengthCreator(10);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="form">
            <div className="fild-div">
                <Field name={'postText'}
                       placeholder={'write something'}
                       component={Input}
                       validate={[requiredFields, maxLength10]}
                />
            </div>
            <div className="butt-div">
                <button>Post</button>
            </div>
        </form>
    )
}

const SendPostForm = reduxForm({form: 'sendPost'})(PostForm);
export default MyPost;