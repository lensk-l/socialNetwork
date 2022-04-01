import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../public/no_photo.png";
import {NavLink} from "react-router-dom";


let Users = (props) => {
    let pages = [];

    for (let i = props.startPage; i <= props.endPage; i++) {
        pages.push(i);
    }

    return <div className={styles.users}>
        <div className={styles.pagination}>
            <div className={styles.prevPage} onClick={() => props.onPrevPage()}><p>Previous Page</p></div>
            {pages.map(page => {
                return <div
                    key={page}
                    className={props.currentPage === page ? styles.selectedPage : ''}
                    onClick={(e) => {
                        props.onPageChanged(page)
                    }}><p>{page}</p></div>
            })}
            <div className={styles.nextPage} onClick={() => props.onNextPage()}><p>next Page</p></div>
        </div>
        {props.users.map(u => <div className={styles.user} key={u.id}>
            <div className={styles.left}>
                <NavLink to={'/profile/' + u.id}>
                    <div><img className={styles.photo} src={u.photos.small != null ? u.photos.small : userPhoto}/></div>
                </NavLink>
                <div>
                    {u.followed

                        ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                  onClick={() => { props.unfollowThunk(u.id)}}
                                  className={styles.fol}> Unfollow</button>

                        : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                  onClick={() => { props.followThunk(u.id)}}
                                  className={styles.unf}>Follow</button>
                    }
                </div>
            </div>
            <div className={styles.right}>
                <div>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </div>
                <div className={styles.location}>
                    <div>{'u.location.city'}</div>
                    <div>{'u.location.country'}</div>
                </div>
            </div>
        </div>)}
    </div>
}


export default Users