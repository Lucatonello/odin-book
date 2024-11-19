import { useState, useEffect } from "react";
import jobsQueries from '../queries/jobsQueries';
import Navbar from './Navbar';
import styles from '../styles/Jobs.module.css';
import defaultCompanyLogo from '../images/default-company-logo.png';
import ViewJob from './ViewJob';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(1);

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
            <Navbar tab={'jobs'}/>
            <div className={styles.pageContainer}>
                <div className={styles.jobListContainer}>
                    <ul>
                        {jobs.map(job => (
                            <li key={job.id}>
                                <div className={selectedJob == job.id ? styles.jobContainerActive : styles.jobContainer }>
                                    <img src={defaultCompanyLogo} alt="company logo" className={styles.companyLogo} />
                                    <div className={styles.jobInfoContainer}>
                                        <a onClick={() => setSelectedJob(job.id)} className={styles.jobTitle}>{job.title}</a>
                                        <p className={styles.infoText}>{job.name}</p>
                                        {job.location !== null ? (
                                            <div style={{ display: 'flex' }}>
                                                <p className={styles.infoText} style={{ color: '#666666', marginRight: '5px' }}>{job.location}</p>
                                                {job.jobtype !== null && <p className={styles.infoText} style={{ color: '#666666' }}>({job.jobtype})</p>}
                                            </div>
                                        ) : job.jobtype && <p className={styles.infoText}>{job.jobtype}</p>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                    {selectedJob && <ViewJob jobId={Number(selectedJob)} />}
            </div>
        </>
    )
}

export default Jobs;