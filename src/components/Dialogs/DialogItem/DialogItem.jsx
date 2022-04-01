import   './dialogItem.css';
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    let path = '' + props.id;

    return (
        <div>
            <div className="dialog_item">
                <NavLink to={path}>{props.name}</NavLink>
            </div>
        </div>
    );
}

export default DialogItem;