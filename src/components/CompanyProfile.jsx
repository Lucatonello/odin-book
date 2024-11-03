import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import memberQueries from '../queries/memberQueries';
import linkedInLogo from '../images/linkedin.png'
import defaultBanner from '../images/default-banner.png';
import Navbar from './Navbar';
import NewPost from './edit&add-Components/NewPost';

import styles from '../styles/CompanyProfile.module.css'; 

function CompanyProfile() {
    const [memberData, setMemberData] = useState([]);

    const { id } = useParams();
    const { type } = useParams();

    useEffect(() => {
        const getCompanyData = async () => {
            const response = await memberQueries.getCompanyData(type, id);
            const data = await response.json();
            setMemberData(data);
        }
        getCompanyData();
    }, [id, type])
    return (
        <>
            <Navbar />

            <div className={styles.profileContainer}>
                        <div className={styles.bannerContainer}>
                            <img src={defaultBanner} className={styles.bannerImage} alt="" />
                            <img 
                                src={linkedInLogo} 
                                className={styles.profilePicture} 
                                alt="profile picture" 
                            />
                        </div>
                        <h1 className={styles.username}>
                            {type === 'user' ? memberData.username : memberData.name}
                        </h1>
                        {memberData.summary && (
                            <strong style={{ marginBottom: '10px', marginTop: '3px' }} className={styles.summary}>{memberData.summary} </strong>
                        )}
                        {memberData.location && (
                            <p className={styles.location}>{memberData.location}</p>
                        )}
                        {memberData.website && (
                            <a className={styles.website} href={memberData.website} target='__blank' style={{ color: '#0a66c2', textDecoration: 'none'}}>{memberData.website}</a>
                        )}
                        <div style={{ display: 'flex' }}>
                            <p className={styles.connections}>
                                {memberData.connections_count} connections 
                            </p>
                            <p className={styles.connections} style={{ marginLeft: '10px'}}>
                                {memberData.followers_count} followers
                            </p>
                        </div>
                        {isAdmin && (
                            <svg onClick={() => setShowEditIntro(true)} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M200-200h50.46l409.46-409.46-50.46-50.46L200-250.46V-200Zm-60 60v-135.38l527.62-527.39q9.07-8.24 20.03-12.73 10.97-4.5 23-4.5t23.3 4.27q11.28 4.27 19.97 13.58l48.85 49.46q9.31 8.69 13.27 20 3.96 11.31 3.96 22.62 0 12.07-4.12 23.03-4.12 10.97-13.11 20.04L275.38-140H140Zm620.38-570.15-50.23-50.23 50.23 50.23Zm-126.13 75.9-24.79-25.67 50.46 50.46-25.67-24.79Z"/>
                            </svg>
        
                        )}
                    </div>
        </>
    )
}

export default CompanyProfile;