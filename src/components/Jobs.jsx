import { useState, useEffect, useRef } from "react";
import jobsQueries from '../queries/jobsQueries';
import Navbar from './Navbar';
import styles from '../styles/Jobs.module.css';
import defaultCompanyLogo from '../images/default-company-logo.png';
import ViewJob from './ViewJob';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(1);
    const detailsRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 540);
        };
        handleResize(); 

        window.addEventListener('resize', handleResize); 
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (selectedJob && detailsRef.current && isMobile) {
            detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [selectedJob, isMobile]);


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
                    {selectedJob && (
                        <div ref={detailsRef}>
                            <ViewJob jobId={selectedJob} />
                        </div>
                    )}
            </div>
        </>
    )
}

export default Jobs;