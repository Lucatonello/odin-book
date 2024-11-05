    import styles from '../styles/ViewJobs.module.css'
    import PropTypes from 'prop-types';
    import defaultCompanyLogo from '../images/default-company-logo.png';
    import { useParams } from 'react-router-dom';
    import jobsQueries from '../queries/jobsQueries';
    import { useEffect, useState } from 'react';
    import Apply from './Apply';
    import Navbar from './Navbar';

    function ViewJob({ jobId: propJobId }) {
        const [jobInfo, setJobInfo] = useState(null);

        const [showApply, setShowApply] = useState(false);

        const { id: paramJobId } = useParams();  

        //use props when available (when this gets called from Jobs component)
        //otherwise, use params (when this gets called from CompanyProfile component)
        const jobId = propJobId || paramJobId;
        
        useEffect(() => {
            const getJobInfo = async() => {
                const response = await jobsQueries.getJobInfo(jobId);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setJobInfo(data[0]);
            }
            getJobInfo();
        }, [jobId]);

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
            return <div>Loading job information...</div>;
        }

        return (
            <>
                {showApply && <Apply onHide={() => setShowApply(false)} jobid={jobInfo.id} />}
                {/* Render the Navbar only if the component was activated from CompanyProfile */}
                {/* otherwise it will already have a Navbar */}
                {!propJobId && paramJobId && <Navbar />}
                <div className={!propJobId && paramJobId ? styles.viewJobTab2 : styles.viewJobTab}>
                    <div className={styles.topLine}>
                        <img src={jobInfo.logo || defaultCompanyLogo} alt="company logo" style={{ height: '31.99px', width: '31.99px' }} />
                        <a href="/" className={styles.companyName}>{jobInfo.name}</a>
                    </div>
                    <h1 className={styles.jobTitle}>{jobInfo.title}</h1>
                    <div className={styles.locationNdApplicants}>
                        {jobInfo.location && <p>{jobInfo.location}</p>}
                        <p style={{ margin: 'auto 3px' }}>·</p>
                        <p>Over 100 applicants</p> {/* Show actual applicants count later */}
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
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z" />
                            </svg>
                            <p className={styles.typeText}>2 of 3 skills match your profile - you may be a good fit</p> {/* Show actual skills match later */}
                        </div>
                    </div>
                    <div className={styles.applyContainer}>
                        <button className={styles.apply} onClick={() => setShowApply(true)}>Apply</button>
                    </div>
                    <hr style={{ margin: '20px 0px' }} />
                    <div className={styles.descriptionContainer}>
                        <h1 className={styles.aboutTitle}>About the job</h1>
                        {formattedDescription}
                    </div>
                </div>
            </>
        );
    }
    ViewJob.propTypes = {
        jobId: PropTypes.number,
    }

    export default ViewJob;