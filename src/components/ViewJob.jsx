import styles from '../styles/ViewJobs.module.css'
import PropTypes from 'prop-types';
import defaultCompanyLogo from '../images/default-company-logo.png';

function ViewJob({ jobInfo }) {
    console.log('jobInfo received:', jobInfo);

    //format new lines in description
    const formattedDescription = jobInfo.description
    ? jobInfo.description
        .split(/(?<=\.|\:)\s+(?=[A-Z])/g) 
        .map(sentence => `<p>${sentence.trim()}</p>`)
        .join('')
    : "";

    return (
        <div className={styles.viewJobTab}>
            <div className={styles.topLine}>
                <img src={jobInfo.logo || defaultCompanyLogo} alt="company logo" style={{ height: '31.99px', width: '31.99px' }}/>
                <a href="/" className={styles.companyName}>{jobInfo.name}</a>
            </div>
            <h1 className={styles.jobTitle}>{jobInfo.title}</h1>
            <div className={styles.locationNdApplicants}>
                {jobInfo.location && (
                  <p>{jobInfo.location}</p>
                )}
                <p style={{ margin: 'auto 3px'}}>·</p>
                <p>Over 100 applicants</p>{/* Show actual applicants count later */}
            </div>
            <div className={styles.moreDetails}>
                <div className={styles.type}>
                    <svg className={styles.infoIcons} style={{ fill: '#5f6369' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                        <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
                    </svg>
                    <p className={styles.typeBox}>{jobInfo.jobtype}</p>
                    {jobInfo.explevel && (
                        <p className={styles.typeBox}>{jobInfo.explevel}</p>
                    )}
                    {jobInfo.salary && (
                        <p className={styles.typeBox}>${jobInfo.salary} /yr</p>
                    )}
                    
                </div>
                <div className={styles.type}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z"/>
                    </svg>
                    <p className={styles.typeText}>2 of 3 skills match your profile - you may be a good fit</p> { /* Show actualt skills match later*/}
                </div>
            </div>
            <div className={styles.applyContainer}>
                <button className={styles.apply}>Apply</button>
            </div>
            <hr style={{ margin: '20px 0px' }} />
            <div className={styles.descriptionContainer}>
                <h1 className={styles.aboutTitle}>About the job</h1>
                <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />
            </div>

        </div>
    )
}
ViewJob.propTypes = {
    jobInfo: PropTypes.object.isRequired,
}

export default ViewJob;