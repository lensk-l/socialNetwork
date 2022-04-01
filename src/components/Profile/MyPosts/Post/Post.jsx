import "./post.css"
import React from "react";

const Post = (props) => {

    return (
        <div className='postBlock'>
            <div className="postImg"></div>
            <div className="postText">
                <p>{props.message}</p>
            </div>
        </div>
    );
}
export default Post;