import { useState, useEffect } from "react";
import memberQueries from '../queries/memberQueries'
import { useNavigate } from "react-router-dom";
import postsQueries from "../queries/postsQueries";
import defaultpfp from '../images/user.png'
import Navbar from "./Navbar";

import styles from "../styles/Notifications.module.css";

function Notifications() {
    const [connectionReqs, setConnectionReqs] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const userid = localStorage.getItem('authorid');
    const type = localStorage.getItem('type');

    const navigate = useNavigate();

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

    if (
        (connectionReqs && connectionReqs.length === 0) &&
        (notifications && notifications.follows && notifications.follows.length === 0) &&
        (notifications.likes && notifications.likes.length === 0) &&
        (notifications.comments && notifications.comments.length === 0)
    ) {
        return (
            <>
                <Navbar tab={'notifications'} />
                <div className={styles.pageContainer}>
                    <p style={{ color: '#666666' }}>You have no new notifications.</p>
                </div>
            </>
        )
    }
    return (
        <>
            <Navbar tab={'notifications'} />

            {/* Title */}
            <div className={styles.pageContainer}>
                <h1 style={{ margin: '5px'}}>Notifications</h1>
            </div>

            {/* Connection requests */}
            {connectionReqs.length > 0 && type === 'user' && (
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

            {/* New followers */}
            {notifications.follows && notifications.follows.length > 0 && (
                <div className={styles.pageContainer}>
                    <h1 style={{ margin: '5px', color: '#666666' }}>New followers</h1>
                    <ul>
                        {notifications.follows.map((follower, index) => (
                            <li key={index}>
                                <div style={{ display: 'flex', marginBottom: '10px' }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <img src={defaultpfp} className={styles.profilePic} alt="Profile picture" />
                                    </div>
                                    <div>
                                        <strong onClick={() => navigate(`/profile/${follower.follower_type}/${follower.follower_id}`)} 
                                                className={styles.memberName}>
                                            {follower.follower_name}
                                        </strong>
                                        {follower.follower_summary !== null && <p style={{ margin: '3px 0px 0px 0px' }}>{follower.follower_summary}</p>}
                                        <p style={{ marginTop: '3px', marginBottom: '0', color: '#666666' }}>New follower</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}


            {/* New likes */}
            {notifications.likes && notifications.likes.length > 0 && (
                <div className={styles.pageContainer}>
                    <h1 style={{ margin: '5px', color: '#666666' }}>New likes</h1>
                    <ul>
                        {notifications.likes.map(like => (
                            <li key={like.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/post/${like.postid}`)}>
                                <div style={{ display: 'flex', marginBottom: '10px' }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <img src={defaultpfp} className={styles.profilePic} alt="Profile picture" />
                                    </div>
                                    <div>
                                        <strong onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/profile/${like.liker_type}/${like.liker_id}`);
                                            }} 
                                            className={styles.memberName}>
                                            {like.liker_name}
                                        </strong>
                                        {like.liker_summary !== null && <p style={{ margin: '3px 0px 0px 0px' }}>{like.liker_summary}</p>}
                                        <p style={{ marginTop: '3px', marginBottom: '0', color: '#666666' }}>New like</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}


            {/* New comments */}
            {notifications.comments && notifications.comments.length > 0 && (
                <div className={styles.pageContainer}>
                    <h1 style={{ margin: '5px', color: '#666666' }}>New comments</h1>
                    <ul>
                        {notifications.comments.map(comment => (
                            <li key={comment.id} onClick={() => navigate(`/post/${comment.postid}`)} style={{ cursor: 'pointer' }}>
                                <div style={{ display: 'flex', marginBottom: '10px' }}>
                                    <div style={{ marginRight: '10px' }}>
                                        <img src={defaultpfp} className={styles.profilePic} alt="Profile picture" />
                                    </div>
                                    <div>
                                        <strong onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/profile/${comment.commenter_type}/${comment.commenter_id}`);
                                            }} 
                                            className={styles.memberName}>
                                            {comment.commenter_name}
                                        </strong>
                                        {comment.commenter_summary !== null && <p style={{ margin: '3px 0px 0px 0px' }}>{comment.commenter_summary}</p>}
                                        <p style={{ marginTop: '3px', marginBottom: '0', color: '#666666' }}>New comment</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </>
    )
}   

export default Notifications;