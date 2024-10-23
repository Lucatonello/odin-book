import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import memberQueries from '../queries/memberQueries';
import linkedInLogo from '../images/linkedin.png'
import defaultBanner from '../images/default-banner.png';
import companyLogo from '../images/default-company-logo.png';
import schoolLogo from '../images/default-school-logo.png';
import Navbar from './Navbar';
import EditIntro from './edit&add-Components/EditIntro'
import EditAbout from './edit&add-Components/EditAbout';
import NewPost from './edit&add-Components/NewPost';
import NewExperience from './edit&add-Components/NewExperience';
import EditExperience from './edit&add-Components/EditExperience';

import styles from '../styles/Profile.module.css'; 

function Profile() {
    const [memberData, setMemberData] = useState('');
    const [memberActivity, setMemberActivity] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userExperience, setUserExperience] = useState([]); 
    const [userEducation , setUserEducation] = useState([]);
    const [userSkills, setUserSkills] = useState([]);

    const [showNewPost, setShowNewPost] = useState(false);
    const [showEditIntro, setShowEditIntro] = useState(false);
    const [showEditAbout, setShowEditAbout] = useState(false);
    const [showNewExperience, setShowNewExperience] = useState(false);
    const [experienceDetails, setExperienceDetails] = useState(null);
    const [showEditExperience, setShowEditExperience] = useState(false);

    const userId = localStorage.getItem('authorid');
    const { type } = useParams();
    const { id } = useParams();

    useEffect(() => {
        if (userId == id) {
            setIsAdmin(true);
        } else return
    }, [id, userId]);

    useEffect(() => {
        const getMemberData = async () => {
            if (type == 'user') {
                const response = await memberQueries.getUserData(type, id);
                const data = await response.json();
                setMemberData(data);
                console.log(data)
            } else if (type == 'company') {
                const response = await memberQueries.getCompanyData(type, id);
                const data = await response.json();
                setMemberData(data);
            }
        } 
        getMemberData();
    }, [id, type]);

    useEffect(() => {
        const getMemberActivity = async () => {
            const response = await memberQueries.getMemberActivity(type, id);
            const data = await response.json();
            setMemberActivity(data);
            console.log(data)
        }
        getMemberActivity();
    }, [id, type]);

    useEffect(() => {
        const getUserExperience = async () => {
            if (type === 'user') {
                const experienceResponse = await memberQueries.getUserExperience(id)
                const experienceData = await experienceResponse.json();
                setUserExperience(experienceData);

                //get education data
                const educationResponse = await memberQueries.getUserEducation(id);
                const educationData = await educationResponse.json();
                setUserEducation(educationData);

                //get skills data
                const skillsResponse = await memberQueries.getUserSkills(id);
                const skillsData = await skillsResponse.json();
                setUserSkills(skillsData);
                console.log('skills data', skillsData);
            } else return
        }
        getUserExperience();
    }, [id, type])

    return (
        <>
            {/* Pop up tabs */}
            {showEditIntro && <EditIntro onHide={() => setShowEditIntro(false)} memberData={memberData} />}
            {showEditAbout && <EditAbout onHide={() => setShowEditAbout(false)} memberData={memberData} />}
            {showNewPost && <NewPost onHide={() => setShowNewPost(false)} />}
            {showNewExperience && <NewExperience onHide={() => setShowNewExperience(false)} userId={userId} />}
            {showEditExperience && <EditExperience onHide={() => setShowEditExperience(false)} userId={userId} experienceDetails={experienceDetails} />}
            <Navbar />

            {/* Main header */}
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
                <strong style={{ marginBottom: '10px', marginTop: '3px' }} className={styles.summary}>{memberData.summary} </strong>
                <p className={styles.location}>{memberData.location}</p>
                <a className={styles.website} href={memberData.website} target='__blank' style={{ color: '#0a66c2', textDecoration: 'none'}}>{memberData.website}</a>
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
            {/* About */}
            {memberData.about && (
                <div className={styles.profileContainer}>
                    <h1 className={styles.titles} style={{ paddingTop: '10px'}}>About</h1>
                    <p className={styles.about}>{memberData.about}</p>
                    {isAdmin && (
                        <svg onClick={() => setShowEditAbout(true)} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                            <path d="M200-200h50.46l409.46-409.46-50.46-50.46L200-250.46V-200Zm-60 60v-135.38l527.62-527.39q9.07-8.24 20.03-12.73 10.97-4.5 23-4.5t23.3 4.27q11.28 4.27 19.97 13.58l48.85 49.46q9.31 8.69 13.27 20 3.96 11.31 3.96 22.62 0 12.07-4.12 23.03-4.12 10.97-13.11 20.04L275.38-140H140Zm620.38-570.15-50.23-50.23 50.23 50.23Zm-126.13 75.9-24.79-25.67 50.46 50.46-25.67-24.79Z"/>
                        </svg>
                    )}
                </div>
            )}

            {/* Activity */}
            <div className={styles.profileContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h1 className={styles.titles} style={{ paddingTop: '10px' }}>Activity</h1>
                    {isAdmin && (
                        <button onClick={() => setShowNewPost(true)} className={styles.createPost} type='button'>Create a post</button>
                    )}
                </div>

                <div className={styles.activityContainer}>
                    {/* Posts Section */}
                    <div className={styles.activitySection}>
                        <strong className={styles.strongTitle} style={{ marginLeft: '20px' }}>Posts</strong>
                        {memberActivity.posts && (
                            <ul className={styles.activityUl}>
                                {memberActivity.posts && memberActivity.posts.map(post => (
                                <li key={post.id} className={styles.post}>
                                    <p>{post.text}</p>
                                </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Comments Section */}
                    <div className={styles.activitySection}>
                    <strong className={styles.strongTitle}>Comments</strong>
                    {memberActivity.comments && (
                        <ul className={styles.activityUl}>
                            {memberActivity.comments && memberActivity.comments.map(comment => (
                            <li key={comment.id}>
                                <p>{comment.text}</p>
                            </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            </div>

            {/* Experience */}
            <div className={styles.profileContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 className={styles.titles} style={{ paddingTop: '10px' }}>Experience</h1>
                    {isAdmin && (
                        <div style={{ display: 'flex' }}>
                            <svg onClick={() => setShowNewExperience(true)} className={styles.close} style={{ margin: 'auto 20px auto 0px' }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                            </svg>
                        </div>
                    )}
                </div>
                <ul>
                    {userExperience && (
                        userExperience.map(exp => (
                            <li style={{ display: 'flex', borderBottom: '1px solid #e8e8e8', width: '90%', margin: '10px 0px' }} key={exp.id}>
                                <div className={styles.logoContainer}>
                                    <img 
                                        src={companyLogo} 
                                        alt="Company Logo" 
                                        style={{ height: '47.99px', width: '47.99px', marginRight: '10px' }} 
                                    />
                                </div>
                                <div className={styles.jobDetailsContainer}>
                                    <strong>{exp.title}</strong>
                                    <p className={styles.experienceP} >{exp.companyname} - {exp.employmenttype}</p>

                                    <p className={styles.experienceP} style={{ color: '#555' }}>
                                        {exp.startmonth} {exp.startyear} - {exp.endmonth ? exp.endmonth + ' ' + exp.endyear : exp.isactive ? 'Present' : null}
                                    </p>
                                    
                                    <p className={styles.experienceP} style={{ color: '#555' }}>{exp.location}</p>
                                </div>
                                {isAdmin && (
                                    <div style={{ position: 'relative' }}>
                                        <svg onClick={() => {
                                            setShowEditExperience(true);
                                            setExperienceDetails(exp);
                                        }} 
                                            style={{ margin: '0px 10px', padding: '5px' }} className={styles.close} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                            <path d="M200-200h50.46l409.46-409.46-50.46-50.46L200-250.46V-200Zm-60 60v-135.38l527.62-527.39q9.07-8.24 20.03-12.73 10.97-4.5 23-4.5t23.3 4.27q11.28 4.27 19.97 13.58l48.85 49.46q9.31 8.69 13.27 20 3.96 11.31 3.96 22.62 0 12.07-4.12 23.03-4.12 10.97-13.11 20.04L275.38-140H140Zm620.38-570.15-50.23-50.23 50.23 50.23Zm-126.13 75.9-24.79-25.67 50.46 50.46-25.67-24.79Z"/>
                                        </svg>
                                    </div>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Education */}
            <div className={styles.profileContainer}>
                <h1 className={styles.titles} style={{ paddingTop: '10px' }}>Education</h1>
                {userEducation && (
                    <ul>
                        {userEducation.map(ed => (
                            <li style={{ display: 'flex', borderBottom: '1px solid #e8e8e8', width: '90%', margin: '10px 0px' }} key={ed.id}>
                                 <div className={styles.logoContainer}>
                                        <img 
                                            src={schoolLogo} 
                                            alt="Company Logo" 
                                            style={{ height: '47.99px', width: '47.99px', marginRight: '10px' }} 
                                        />
                                </div>
                                <div className={styles.jobDetailsContainer}>
                                        <strong>{ed.school}</strong>
                                        <p className={styles.experienceP} >{ed.degree}</p>
    
                                        <p className={styles.experienceP} style={{ color: '#555' }}>
                                            {ed.startdate} - {ed.enddate ? ed.enddate : ed.isactive ? 'Present' : null}
                                        </p>
                                        
                                        <p className={styles.experienceP} style={{ color: '#555' }}>{ed.location}</p>
                                    </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* Skills */}
            <div className={styles.profileContainer}>
                <h1 className={styles.titles} style={{ paddingTop: '10px' }}>Skills</h1>
                {userSkills && (
                    <ul>
                        {userSkills.map(skill => (
                            <li key={skill.id} style={{ borderBottom: '1px solid #e8e8e8', width: '90%' }}>
                                <p>{skill.skill}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
} 

export default Profile;
