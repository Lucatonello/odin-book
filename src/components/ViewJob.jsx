import styles from '../styles/ViewJobs.module.css'
import PropTypes from 'prop-types';
import defaultCompanyLogo from '../images/default-company-logo.png';

function ViewJob({ jobInfo }) {
    console.log('jobInfo received:', jobInfo);
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
                <svg className={styles.infoIcons} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" className="mercado-match" width="24" height="24" focusable="false">
                    <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
                </svg>
                <p style={{ margin: 'auto 0px auto 10px' }}>{jobInfo.jobtype}</p>
            </div>
            </div>
        </div>
    )
}
ViewJob.propTypes = {
    jobInfo: PropTypes.object.isRequired,
}

export default ViewJob;