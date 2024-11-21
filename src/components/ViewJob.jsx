    import styles from '../styles/ViewJobs.module.css'
    import PropTypes from 'prop-types';
    import defaultCompanyLogo from '../images/default-company-logo.png';
    import defaultpfp from '../images/user.png';
    import { useParams } from 'react-router-dom';
    import jobsQueries from '../queries/jobsQueries';
    import memberQueries from '../queries/memberQueries';
    import { useEffect, useState } from 'react';
    import Apply from './Apply';
    import Navbar from './Navbar';
    import { useNavigate } from 'react-router-dom';

    function ViewJob({ jobId: propJobId }) {
        const [jobInfo, setJobInfo] = useState([]);
        const [jobApplicants, setJobApplicants] = useState([]);
        const [showApply, setShowApply] = useState(false);

        const [skillsMatch, setSkillsMatch] = useState(null);

        const { id: paramJobId } = useParams();  
        const type = localStorage.getItem('type');
        const memberid = localStorage.getItem('authorid')
        //use props when available (when this gets called from Jobs component)
        //otherwise, use params (when this gets called from CompanyProfile component)
        const jobId = propJobId || paramJobId;
        const userid = localStorage.getItem('authorid');
        const navigate = useNavigate();
   
        useEffect(() => {
            const getJobInfo = async () => {
                const response = await jobsQueries.getJobInfo(jobId, userid);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setJobInfo(data[0]);
                console.log('jobInfo: ', data[0]);
            }
            getJobInfo();

            
        }, [jobId, userid]);

        useEffect(() => {
            if (jobInfo == undefined) {
                const returnError = () => {
                    return (
                        <div>
                            <h1>Oops, it looks like the job market is taking a coffee break. </h1>
                            <p>Check back later—your dream job might just be brewing!</p>
                            <button onClick={() => navigate('/')} className={styles.connect}>Go to your feed</button>
                        </div>
                    )
                }
                returnError();
            } else if (jobInfo) {
                if (type == 'company' && jobInfo.companyid == memberid) {
                    const getJobApplicants = async () => {
                        const response = await jobsQueries.getJobApplicants(jobId);
                        const data = await response.json();
                        setJobApplicants(data);
                        console.log('applicants: ', data);
                    }
                    getJobApplicants();
                } else return
            }
        }, [jobId, jobInfo, type, memberid, navigate]);

        useEffect(() => {
            const getUserSkills = async () => {
                setSkillsMatch(0);

                const response = await memberQueries.getUserSkills(userid);
                const userSkills = await response.json();

                console.log(userSkills);

                if (jobInfo.skills) {
                    const requiredSkills = jobInfo.skills.split(', ');
                    
                    //compare ammount of skills matching
                    for (let i = 0; i < requiredSkills.length; i++) {
                        for (let j = 0; j < userSkills.length; j++) {
                            if (requiredSkills[i].toLowerCase() == userSkills[j].skill.toLowerCase()) {
                                setSkillsMatch((prevSkillsMatch) => prevSkillsMatch + 1);
                            }
                        }
                    }
                }
            }
            type === 'user' && getUserSkills();
        }, [userid, jobInfo, type]);

        let formattedDescription = [];
        //format new lines in description
        if (jobInfo && jobInfo.description) {
            formattedDescription = jobInfo.description
                .split(/(?<=\.|\:)\s+(?=[A-Z])/g) 
                .map((sentence, index) => (
                    <p key={index}>{sentence.trim()}</p>
                ));
        }

        if (!jobInfo || Object.keys(jobInfo).length === 0) {
            return (
                <p style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh', 
                    fontSize: '2rem', 
                    margin: 0
                }}>
                Loading...
                </p>
            )
        }
        return (
            <>
                {showApply && <Apply onHide={() => setShowApply(false)} jobid={jobInfo.id} />}
                {/* Render the Navbar only if the component was activated from CompanyProfile */}
                {/* otherwise it will already have a Navbar */}
                {!propJobId && paramJobId && <Navbar />}

                <div className={!propJobId && paramJobId ? styles.viewJobTab2 : styles.viewJobTab}>
                    <div className={styles.topLine}>
                        <img 
                            src={jobInfo.logo || defaultCompanyLogo} alt="company logo" 
                            style={{ height: '31.99px', width: '31.99px' }} 
                        />
                        <a href={`/profile/company/${jobInfo.companyid}`} className={styles.companyName}>{jobInfo.name}</a>
                    </div>
                    <h1 className={styles.jobTitle}>{jobInfo.title}</h1>
                    <div className={styles.locationNdApplicants}>
                        {jobInfo.location && <p>{jobInfo.location}</p>}
                        <p style={{ margin: 'auto 3px' }}>·</p>
                        <p>{jobInfo.applicant_count} applicants</p>
                    </div>
                    <div className={styles.moreDetails}>
                        <div className={styles.type}>
                            <svg className={styles.infoIcons} style={{ fill: '#5f6369' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                                <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
                            </svg>
                            <p className={styles.typeBox}>{jobInfo.jobtype}</p>
                            {jobInfo.explevel && <p className={styles.typeBox}>{jobInfo.explevel}</p>}
                            {jobInfo.salary && <p className={styles.typeBox}>${jobInfo.salary} /yr</p>}
                        </div>
                        <div className={styles.type}>
                            
                            {jobInfo.skills && type && type !== 'company' && (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                        <path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z" />
                                    </svg>
                                    <p className={styles.typeText}>{skillsMatch} of {jobInfo.skills && jobInfo.skills.split(', ').length} skills match your profile</p>
                                </>
                            )} 
                        </div>
                    </div>
                    {type == 'user' && (
                        <div className={styles.applyContainer}>
                            {type === 'user' && !jobInfo.has_applied ? (
                                <button className={styles.apply} onClick={() => setShowApply(true)}>Apply</button>
                            ) : (
                                <>
                                    <h1>Job activity</h1>
                                    <hr />
                                    <ul><li style={{ listStyleType: 'circle', marginLeft: '10px' }}>Application submitted</li></ul>
                                </>
                            )}
                        </div>
                    )}
                    <hr style={{ margin: '20px 0px' }} />
                    <div className={styles.descriptionContainer}>
                        <h1 className={styles.aboutTitle}>About the job</h1>
                        {formattedDescription}
                    </div>
                    {type == 'company' && jobInfo.companyid == memberid && (
                        <>
                        <hr />
                            <h1>Applicants ({jobApplicants.length})</h1>
                            <ul>
                                {jobApplicants.map(applicant => (
                                    <li key={applicant.id}>
                                        <div style={{ display: 'flex' }}>
                                            <img className={styles.profilePic} src={defaultpfp} alt="profile picture" />
                                            <div>
                                                <strong onClick={() => navigate(`/profile/user/${applicant.userid}`)} className={styles.applicantName} style={{ marginLeft: '10px' }}>{applicant.username}</strong>
                                                <p className={styles.applicantDetails}>{applicant.summary}</p>
                                                <p className={styles.applicantDetails} style={{ marginTop: '10px' }}><strong>Email: </strong>{applicant.email}</p>
                                                <p className={styles.applicantDetails}><strong>Number: </strong>{applicant.number}</p>
                                                <p className={styles.applicantDetails}>
                                                    <a href={`http://localhost:10000/uploads/${applicant.cv}`} target="_blank" rel="noopener noreferrer">
                                                        View CV
                                                    </a>
                                                </p>
                                                <hr style={{ margin: '10px 0px' }} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </>
        );
    }
    ViewJob.propTypes = {
        jobId: PropTypes.number,
    }

    export default ViewJob;