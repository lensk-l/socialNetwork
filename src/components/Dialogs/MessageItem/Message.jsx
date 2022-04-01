import s from'./message.module.css'

const Messages = (props) => {
    return (
        <div>
            <div className={s.item}>
                <p>{props.name + ' написал: ' + props.message}</p>
            </div>
        </div>
    )
}

export default Messages