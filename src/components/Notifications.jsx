import { useState, useEffect } from "react";
import memberQueries from '../queries/memberQueries'
import postsQueries from "../queries/postsQueries";
import defaultpfp from '../images/user.png'
import Navbar from "./Navbar";

import styles from "../styles/Notifications.module.css";

function Notifications() {
    const [connectionReqs, setConnectionReqs] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const userid = localStorage.getItem('authorid');
    const type = localStorage.getItem('type');

    //get connection requests
    useEffect(() => {
        const getRequests = async () => {
            const response = await memberQueries.getRequests(userid);
            const data = await response.json();
            console.log('reqests: ', data);
            setConnectionReqs(data);
        }
        getRequests();
    }, [userid]);

    //get other notifications
    useEffect(() => {
        const getMemberNotifications = async () => {
            const response = await postsQueries.getMemberNotifications(userid, type);
            const data = await response.json();
            console.log('notifications: ', data);
            setNotifications(data);
        }
        getMemberNotifications();
    }, [userid, type]);

    const handleConnectionReq = async (reqid, status) => {
        const response = await memberQueries.handleConnectionReq(reqid, status);
        const result = await response.json();

        if (result.isDone) {
            window.location.reload();
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <h1 style={{ margin: '5px'}}>Notifications</h1>
            </div>
            {connectionReqs.length > 0 && (
                <div className={styles.pageContainer}>
                    <h1 style={{ margin: '5px', color: '#666666' }}>Connection requests</h1>
                    <ul>
                        {connectionReqs.map(request => (
                            <li key={request.id}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <img src={defaultpfp} className={styles.profilePic} alt="Profile picture" />
                                    </div>
                                    <div>
                                        <strong>{request.username}</strong>
                                        <p style={{ margin: '3px 0px 0px 0px' }}>{request.summary}</p>
                                        <p style={{ marginTop: '3px', color: '#666666' }}>Connection request</p>
                                    </div>
                                    <div className={styles.buttonsContainer}>
                                        <button type="button" onClick={() => handleConnectionReq(request.id, 'accepted')} className={styles.accept}>Accept</button>
                                        <button type="button" onClick={() => handleConnectionReq(request.id, 'declined')} className={styles.decline}>Decline</button>
                                    </div>
                                </div>
                                <hr />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className={styles.pageContainer}>
                <h1 style={{ margin: '5px', color: '#666666' }}>New followers</h1>
                <ul>
                    {notifications.follows?.map(follower => (
                        <li key={follower.follower_id}>
                            <div style={{ display: 'flex', marginBottom: '10px' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <img src={defaultpfp} className={styles.profilePic} alt="Profile picture" />
                                </div>
                                <div>
                                    <strong>{follower.follower_name }</strong>
                                    {follower.follower_summary.length !== 0 && <p style={{ margin: '3px 0px 0px 0px' }}>{follower.follower_summary}</p>}
                                    <p style={{ marginTop: '3px', marginBottom: '0', color: '#666666' }}>New follower</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.pageContainer}>
                <h1 style={{ margin: '5px', color: '#666666' }}>New likes</h1>
                <ul>
                    {notifications.likes?.map(like => (
                        <li key={like.id}>
                            <div style={{ display: 'flex', marginBottom: '10px' }}>
                                <div style={{ marginRight: '10px' }}>
                                    <img src={defaultpfp} className={styles.profilePic} alt="Profile picture" />
                                </div>
                                <div>
                                    <strong>{like.liker_name }</strong>
                                    {like.liker_summary !== null && <p style={{ margin: '3px 0px 0px 0px' }}>{like.liker_summary}</p>}
                                    <p style={{ marginTop: '3px', marginBottom: '0', color: '#666666' }}>New like</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.pageContainer}>
                <h1 style={{ margin: '5px', color: '#666666' }}>New comments</h1>
                <ul>
                    {notifications.comments?.map(comment => (
                       <li key={comment.id}>
                       <div style={{ display: 'flex', marginBottom: '10px' }}>
                           <div style={{ marginRight: '10px' }}>
                               <img src={defaultpfp} className={styles.profilePic} alt="Profile picture" />
                           </div>
                           <div>
                               <strong>{comment.commenter_name }</strong>
                               {comment.commenter_summary !== null && <p style={{ margin: '3px 0px 0px 0px' }}>{comment.commenter_summary}</p>}
                               <p style={{ marginTop: '3px', marginBottom: '0', color: '#666666' }}>New comment</p>
                           </div>
                       </div>
                   </li> 
                    ))}
                </ul>
            </div>
        </>
    )
}   

export default Notifications;