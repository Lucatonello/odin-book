import { useState, useEffect } from "react";
import jobsQueries from '../queries/jobsQueries';
import Navbar from './Navbar';
import styles from '../styles/Jobs.module.css';
import defaultCompanyLogo from '../images/default-company-logo.png';
import ViewJob from './ViewJob';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState([]);

    useEffect(() => {
        const getJobsData = async () => {
            try {
                const response = await jobsQueries.getAllJobs();
                const data = await response.json();
                setJobs(data);
                console.log('jobs: ', data);
            } catch (err) {
                console.error(err)
            }
        }
        getJobsData();
    }, []);

    return (
        <>
            <Navbar />
            <div className={styles.pageContainer}>
                <div className={styles.jobListContainer}>
                    <ul>
                        {jobs.map(job => (
                            <li key={job.id} style={{ display: 'flex', padding: '10px 10px 0px 10px' }}>
                                <img src={defaultCompanyLogo} alt="company logo" className={styles.companyLogo} />
                                <div className={styles.jobInfoContainer}>
                                    <a onClick={() => setSelectedJob(job)} className={styles.jobTitle}>{job.title}</a>
                                    <p className={styles.infoText}>{job.name}</p>
                                    {job.location !== null ? (
                                        <div style={{ display: 'flex' }}>
                                            <p className={styles.infoText} style={{ color: '#666666', marginRight: '5px' }}>{job.location}</p>
                                            {job.jobtype !== null && <p className={styles.infoText} style={{ color: '#666666' }}>({job.jobtype})</p>}
                                        </div>
                                    ) : job.jobtype && <p className={styles.infoText}>{job.jobtype}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                    <ViewJob jobInfo={selectedJob} />
            </div>
        </>
    )
}

export default Jobs;