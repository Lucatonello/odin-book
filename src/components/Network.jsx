import { useState, useEffect, useRef  } from "react";
import memberQueries from '../queries/memberQueries';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import NewMessageForm from './NewMessageForm';
import styles from '../styles/Network.module.css';
import defaultpfp from '../images/user.png'

function Network() {
    const [connections, setConnections] = useState([]);

    const [showDropdown, setShowDropdown] = useState(null);
    const dropdownRef = useRef(null);

    const [showMessageForm, setShowMessageForm] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    const navigate = useNavigate();

    const userid = localStorage.getItem('authorid');
    const type = localStorage.getItem('type');

    if (type !== 'user') {
        navigate('404');
    }

    const handleRemoveConnection = async (connectionid) => {
        const response = await memberQueries.removeConnection(userid, connectionid);
        const result = await response.json();
        
        if (result.isDone) {
           setConnections((prevConnections) =>
            prevConnections.filter((conn) => 
                conn.id !== connectionid
            )
        )  
        }
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMessage = async (receiverid, username, summary) => {
        const newUserDetails = {
            receiverid,
            username,
            summary
        };
        setUserDetails(newUserDetails);
        setShowMessageForm(true);
    }

    return (
        <>
            <Navbar tab={'network'} />
            {showMessageForm && <NewMessageForm userDetails={userDetails} onHide={() => setShowMessageForm(false)} />}
            <div className={styles.pageContainer} style={{ display: 'flex', padding: '0px 0px 0px 10px' }}>
                <a className={styles.sectionButtonActive}>My network</a>
                <a className={styles.sectionButton} onClick={() => navigate('/network/grow')}>Grow</a>
            </div>
            <div className={styles.pageContainer}>
                <p>Your connections ({connections.length})</p>
                <ul className={styles.connectionsList}>
                    {connections.length === 0 && (
                        <div>
                            <h2 style={{ color: '#666666' }}>Looks like you dont have any connections yet</h2>
                            <button type="button" onClick={() => navigate('/network/grow')} className={styles.connect}>Grow your network</button>
                        </div>
                    )}
                   {connections.map(connection => (
                        <li key={connection.id}>
                            <div style={{ display: 'flex'}}>
                                <img className={styles.profilePic} src={connection.profilepic || defaultpfp} alt="profile picture" />
                                <div style={{ marginTop: '7px'}}>
                                    <strong className={styles.connctionName} onClick={() => navigate(`/profile/user/${connection.id}`)}>{connection.username}</strong>
                                    <p className={styles.connctionDetails}>{connection.summary}</p>
                                </div>
                                <div className={styles.messageButtonContainer}>
                                    <button onClick={() => handleMessage(connection.id, connection.username, connection.summary)} className={styles.messageButton}>Message</button>
                                    <svg onClick={() => setShowDropdown(showDropdown === connection.id ? null : connection.id)}  xmlns="http://www.w3.org/2000/svg" style={{ margin: '0px 10px', padding: '5px' }} className={styles.moreButton}  height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                        <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                                    </svg>
                                    {showDropdown === connection.id && (
                                         <ul ref={dropdownRef} className={styles.dropdownMenu}>
                                         <li className={styles.dropdownItem}>
                                         <svg style={{ margin: 'auto 5px auto 0px'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                        </svg>
                                            <p style={{ margin: 'auto 0'}} onClick={() => handleRemoveConnection(connection.id)}>Remove connection</p>
                                        </li>
                                     </ul>
                                    )}
                                </div>
                            </div>
                            <hr style={{ width: '80%' }}/>
                        </li>
                   ))}
                </ul>
            </div>
        </>
    
    )
}

export default Network;