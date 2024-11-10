import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import memberQueries from "../queries/memberQueries";
import defaultpfp from '../images/user.png'
import styles from '../styles/Network.module.css'

function GrowNetwork() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const userid = localStorage.getItem('authorid');

    useEffect(() => {
        const getAllUsers = async () => {
            const response = await memberQueries.getAllUsers(userid);
            const data = await response.json();
            setUsers(data);
            console.log('users: ', data);
        }
        getAllUsers();
    }, [userid]);

    const handleConnect = async (id) => {
        const response = await memberQueries.connect(userid, id);
        const resut = await response.json();
        if (resut.isDone) {
            window.location.reload();
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer} onClick={() => navigate('/network')} style={{ display: 'flex', padding: '0px 0px 0px 10px' }}>
                <a className={styles.sectionButton}>My network</a>
                <a className={styles.sectionButtonActive}>Grow</a>
            </div>
            <div className={styles.pageContainer}>
                <p style={{ margin: '0px 0px 10px 0px' }}>Expand your network</p>
                <div className={styles.peopleGrid}>
                     {users.map(user => (
                        <div className={styles.userBox} key={user.id}>
                            <div className={styles.boxSection}>
                                <img className={styles.profilePicBox} src={defaultpfp} alt="Profile picture" />
                            </div>
                            <div className={styles.boxSection}>
                                <strong >{user.username}</strong>
                            </div>
                            <div className={styles.boxSection} style={{ textAlign: 'center' }}>
                                <p style={{ margin: '0', padding: '0px 15px', color: '#666666' }}>{user.summary}</p>
                            </div>
                            <div className={styles.boxSection}>
                                <button className={styles.connect} onClick={() => handleConnect(user.id)}>Connect</button>
                            </div>
                        </div>
                     ))}
                </div>
            </div>
        </>
    );
}

export default GrowNetwork;