import { useState, useEffect } from "react";
import memberQueries from '../queries/memberQueries';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styles from '../styles/Network.module.css';
import defaultpfp from '../images/user.png'

function Network() {
    const [connections, setConnections] = useState([]);

    const navigate = useNavigate();

    const userid = localStorage.getItem('authorid');
    const type = localStorage.getItem('type');

    if (type !== 'user') {
        navigate('404');
    }


    useEffect(() => {
        const getUserConnections = async () => {
            const response = await memberQueries.getUserConnections(userid);
            const data = await response.json(); 
            setConnections(data);
            console.log('connections: ', data);
        }
        getUserConnections();
    }, [userid]);

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer} style={{ display: 'flex' }}>
                <button>My network</button>
                <button>Grow</button>
            </div>
            <div className={styles.pageContainer}>
                <p>Your connections ({connections.length})</p>
                <ul className={styles.connectionsList}>
                   {connections.map(connection => (
                        <li key={connection.id}>
                            <div style={{ display: 'flex'}}>
                                <img className={styles.profilePic} src={connection.profilepic || defaultpfp} alt="profile picture" />
                                <div>
                                    <strong className={styles.connctionDetails}>{connection.username}</strong>
                                    <p className={styles.connctionDetails}>{connection.summary}</p>
                                </div>
                                <div className={styles.messageButtonContainer}>
                                    <button className={styles.messageButton}>Message</button>
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: '0px 10px' }} className={styles.moreButton}  height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                        <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                                    </svg>
                                </div>
                            </div>
                        </li>
                   ))}
                </ul>
            </div>
        </>
    
    )
}

export default Network;