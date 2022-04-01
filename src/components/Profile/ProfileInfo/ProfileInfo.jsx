import './profileInfo.css'
import Preloader from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

    if(!props.profile) {
        return <Preloader/>
    }

    const mainPhotoSelected =(e)=> {
       if(e.target.files.length){
           props.savePhoto(e.target.files[0])
       }
    }
    return (
        <div className="p_content">
            <div className="bigImg"></div>
            <div className="profLogo">
                <img src={props.profile.photos.large} alt=""/>
            </div>
            {props.isOwner == null && <div><input type={"file"} onChange={mainPhotoSelected}/></div>}
            <div className="info">
                <h2>my name: {props.profile.fullName.toUpperCase()}</h2>
                <p>about me: {props.profile.aboutMe}</p>
                <p>City: Irpin </p>
                <p>Contacts: {Object.keys(props.profile.contacts).map(key => {
                     if(props.profile.contacts[key]) {
                        return  <div key={key}><b>{key}</b>: {props.profile.contacts[key]}
                        </div>
                     } else {
                         return <div key={key}><b>{key}</b>: ----</div>
                     }
                   //
                })
                }</p>
            </div>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>

    );
}
export default ProfileInfo;

