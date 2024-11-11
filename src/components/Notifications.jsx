import { useState, useEffect } from "react";
import memberQueries from '../queries/memberQueries'
import defaultpfp from '../images/user.png'
import Navbar from "./Navbar";

import styles from "../styles/Notifications.module.css";

function Notifications() {
    const [connectionReqs, setConnectionReqs] = useState([]);

    const userid = localStorage.getItem('authorid');

    useEffect(() => {
        const getRequests = async () => {
            const response = await memberQueries.getRequests(userid);
            const data = await response.json();
            console.log('reqests: ', data);
            setConnectionReqs(data);
        }
        getRequests();
    }, [userid]);

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
                <h1 style={{ margin: '5px' }}>Notifications</h1>
            </div>
            {connectionReqs.length > 0 && (
                <div className={styles.pageContainer}>
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
        </>
    )
}   

export default Notifications;