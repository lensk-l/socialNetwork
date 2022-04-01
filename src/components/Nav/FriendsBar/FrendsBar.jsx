import FriendItem from "./FriendItem/FriendItem";
import './frendsBar.css'


const FBar = (props) => {

  let friendsItem = props.friends.map(friend => <FriendItem name={friend.name} key={friend.id}/>);

    return <div>
        <div className="friend_item">
            {friendsItem}
        </div>
    </div>
}


//TODO как-то передать сюда стейт
export default FBar;