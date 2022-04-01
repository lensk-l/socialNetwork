import "./nav.css"
import {Link, NavLink} from "react-router-dom";
import FBarContainer from "./FriendsBar/FBarContainer";

const Navbar = (props) => {
    return (
        <nav className='nav'>
            <div className="nav_item"><NavLink to="/profile">Profile</NavLink></div>
            <div className="nav_item"><NavLink to="/dialogs">Dialogs</NavLink></div>
            <div className="nav_item"><NavLink to="/users">Users</NavLink></div>
            <div className="nav_item"><NavLink to="/settings">Settings</NavLink></div>
            <div className="nav_item">
                <NavLink to="/friends">Friends</NavLink>
                <div className="f_bar"><FBarContainer/></div>
            </div>
        </nav>
    );
}
export default Navbar;
