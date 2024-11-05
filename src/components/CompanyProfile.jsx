import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import memberQueries from '../queries/memberQueries';
import companyLogo from '../images/default-company-logo.png';
import defaultBanner from '../images/default-banner.png';
import Navbar from './Navbar';
import NewPost from './edit&add-Components/NewPost';
import EditCompanyIntro from './edit&add-Components/EditCompanyIntro'
import EditAbout from './edit&add-Components/EditAbout';
import NewJobPost from './edit&add-Components/NewJobPost';

import styles from '../styles/CompanyProfile.module.css'; 

function CompanyProfile() {
    const [memberData, setMemberData] = useState([]);
    const [memberActivity, setMemberActivity] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [jobOpenings, setJobOpenings] = useState([]);

    const [showEditIntro, setShowEditIntro] = useState(false);
    const [showEditAbout, setShowEditAbout] = useState(false);
    const [showNewPost, setShowNewPost] = useState(false)
    const [showNewJobPost, setShowNewJobPost] = useState(false);

    const userId = localStorage.getItem('authorid');
    const userType = localStorage.getItem('type');
    const { id } = useParams();
    const { type } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (userId == id && userType == type) {
            setIsAdmin(true);
        } else return
    }, [id, userId, userType, type]);

    useEffect(() => {
        const getCompanyData = async () => {
            const response = await memberQueries.getCompanyData(type, id);
            const data = await response.json();
            setMemberData(data);
            console.log('company data: ', data);
        }
        getCompanyData();
    }, [id, type])

    useEffect(() => {
        const getMemberActivity = async () => {
            const response = await memberQueries.getMemberActivity(type, id);
            const data = await response.json();
            setMemberActivity(data);
        }
        getMemberActivity();
    }, [id, type]);

    useEffect(() => {
        const getCompanyJobOpenings = async () => {
            const response = await memberQueries.getCompanyJobOpenings(id);
            const data = await response.json();
            setJobOpenings(data);
            console.log('jobs: ', data);
        }
        getCompanyJobOpenings();
    }, [id]);
    
    return (
        <>
            <Navbar />

            {/* Pop ups */}
            {showEditIntro && <EditCompanyIntro onHide={() => setShowEditIntro(false)} memberData={memberData} />}
            {showEditAbout && <EditAbout onHide={() => setShowEditAbout(false)} memberData={memberData} />}
            {showNewPost && <NewPost onHide={() => setShowNewPost(false)} />}
            {showNewJobPost && <NewJobPost onHide={() => setShowNewJobPost(false)} companyid={id}/>}

            {/* Main header */}
            <div className={styles.profileContainer}>
                <div className={styles.bannerContainer}>
                    <img src={defaultBanner} className={styles.bannerImage} alt="banner" />
                    <img 
                        src={companyLogo} 
                        className={styles.profilePicture} 
                        alt="profile picture" 
                    />
                </div>
                    <h1 className={styles.username}>{memberData.name}</h1>
                   
                    {memberData.location && (
                        <p className={styles.location}>{memberData.location}</p>
                    )}
                    {memberData.website && (
                        <a className={styles.website} href={memberData.website} target='__blank' style={{ color: '#0a66c2', textDecoration: 'none'}}>{memberData.website}</a>
                    )}
                    <div>
                        <p className={styles.connections} style={{ marginLeft: '20px'}}>
                            {memberData.followers_count} followers
                        </p>
                    </div>
                        {isAdmin && userId == id && userType == type && (
                            <svg onClick={() => setShowEditIntro(true)} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M200-200h50.46l409.46-409.46-50.46-50.46L200-250.46V-200Zm-60 60v-135.38l527.62-527.39q9.07-8.24 20.03-12.73 10.97-4.5 23-4.5t23.3 4.27q11.28 4.27 19.97 13.58l48.85 49.46q9.31 8.69 13.27 20 3.96 11.31 3.96 22.62 0 12.07-4.12 23.03-4.12 10.97-13.11 20.04L275.38-140H140Zm620.38-570.15-50.23-50.23 50.23 50.23Zm-126.13 75.9-24.79-25.67 50.46 50.46-25.67-24.79Z"/>
                            </svg>
        
                        )}
            </div>

            {/* About */}
            {memberData.about && (
                <div className={styles.profileContainer}>
                    <h1 className={styles.titles} style={{ paddingTop: '10px'}}>Overview</h1>
                    <p className={styles.about}>{memberData.about}</p>
                    {isAdmin && userId == id && userType == type && (
                        <svg onClick={() => setShowEditAbout(true)} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="M200-200h50.46l409.46-409.46-50.46-50.46L200-250.46V-200Zm-60 60v-135.38l527.62-527.39q9.07-8.24 20.03-12.73 10.97-4.5 23-4.5t23.3 4.27q11.28 4.27 19.97 13.58l48.85 49.46q9.31 8.69 13.27 20 3.96 11.31 3.96 22.62 0 12.07-4.12 23.03-4.12 10.97-13.11 20.04L275.38-140H140Zm620.38-570.15-50.23-50.23 50.23 50.23Zm-126.13 75.9-24.79-25.67 50.46 50.46-25.67-24.79Z"/>
                        </svg>
                    )}
                </div>
            )}
            {/* Activity */}
            <div className={styles.profileContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h1 className={styles.titles} style={{ paddingTop: '10px' }}>Page activity</h1>
                        {isAdmin && userId == id && userType == type && (
                            <button onClick={() => setShowNewPost(true)} className={styles.createPost} type='button'>Create a post</button>
                        )}
                </div>
        
                <div className={styles.activityContainer}>
                    {/* Posts Section */}
                    <div className={styles.activitySection}>
                        <strong className={styles.strongTitle} style={{ marginLeft: '20px' }}>Posts</strong>
                        {memberActivity.posts !== 0 ? (
                            <ul className={styles.activityUl}>
                                {memberActivity.posts && memberActivity.posts.map(post => (
                                <li key={post.id} className={styles.post}>
                                    <p>{post.text}</p>
                                </li>
                                ))}
                            </ul>
                        ) : <p style={{ marginLeft: '20px', color: 'rgba(0, 0, 0, 0.6)' }}>Nothing to see for now</p>}
                            </div>
                            {/* Comments Section */}
                            <div className={styles.activitySection}>
                            <strong className={styles.strongTitle}>Comments</strong>
                            {memberActivity.comments !== 0 ? (
                                <ul className={styles.activityUl}>
                                    {memberActivity.comments && memberActivity.comments.map(comment => (
                                    <li key={comment.id}>
                                        <p>{comment.text}</p>
                                    </li>
                                    ))}
                                </ul>
                            ) : <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Nothing to see for now</p>}
                        </div>
                    </div>
            </div>

            {/* Job openings */}
            {jobOpenings.length !== 0 && (
                <div className={styles.profileContainer}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <h1 className={styles.titles} style={{ paddingTop: '10px' }}>Recent job openings</h1>
                        {isAdmin && userId == id && userType == type && (
                            <button onClick={() => setShowNewJobPost(true)} className={styles.createPost} type='button'>Create a job post</button>
                        )}
                    </div>
                    <ul className={styles.jobListContainer}>
                        {jobOpenings.map(job => (
                            <li key={job.id}>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <img src={companyLogo} alt="logo" style={{ height: '47.99px', width: '47.99px', margin: '0px 10px 0px 20px' }} />
                                    </div>
                                    <div className={styles.jobDetailsContainer}>
                                        <strong onClick={() => navigate(`/jobs/${job.id}`)} className={styles.jobTitle}>{job.title}</strong>
                                        <p style={{ marginTop: '7px', fontSize: '12px' }}>{job.location}</p>
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

export default CompanyProfile;