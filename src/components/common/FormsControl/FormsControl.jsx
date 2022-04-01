import React from "react";
import style from './formControle.module.css';

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <>

            <div className={(hasError ? style.error : '')}>
                <input {...input} {...props}/>
                {hasError && <p>{meta.error}</p>}

            </div>
        </>

    )
}

export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <>

            <div className={(hasError ? style.errorTextarea : '')}>
                <textarea {...input} {...props}/>
            </div>
            {hasError &&<p>{meta.error}</p>}
        </>

    )

}

export const InputLogin = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <>

            <div className={(hasError ? style.errorInput : '')}>
                <input {...input} {...props}/>
                {hasError && <p>{meta.error}</p>}

            </div>
        </>

    )
}
