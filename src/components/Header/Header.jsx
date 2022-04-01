import "./header.css"
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return (
        <header className='header'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/200px-NASA_logo.svg.png" alt=""/>
            <div className='loginBlock'>
                {props.isAuth
                    ? <div>{props.login}  - <button onClick={props.logeOutThunk}> LogOut</button></div>
                    :  <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
}
export default Header;