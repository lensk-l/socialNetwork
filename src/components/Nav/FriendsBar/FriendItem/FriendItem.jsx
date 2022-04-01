import './friend.css'

const FriendItem = (props) => {

    return (
        <div className="name">
           <p>{props.name}</p>
        </div>
    )
}
export default FriendItem;