import { useState } from 'react';
import jobsQueries from '../queries/jobsQueries';
import PropTypes from 'prop-types';
import styles from '../styles/EditProfile.module.css'

function Apply({ onHide, jobid }) {
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [cv, setCv] = useState(null); 

    const userid = localStorage.getItem('authorid');

    const handleFileChange = (e) => {
        setCv(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('number', number);
        formData.append('cv', cv);
        formData.append('jobid', jobid);
        formData.append('userid', userid);

        await jobsQueries.applyToJob(formData);

    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h1>Apply</h1>
                    <svg style={{ margin: '5px 0px'}} className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend>Email *</legend>
                    <input 
                        type="text"
                        value={email}
                        className={styles.input}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <legend>Phone number *</legend>
                    <input 
                        type='text'
                        value={number}
                        className={styles.input}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                     <legend>Upload CV *</legend>
                    <input 
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className={styles.input}
                        onChange={handleFileChange}
                        required
                    />
                    <hr />
                    <div className={styles.bottom}>
                        <button type='submit' className={styles.save}>Apply</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
Apply.propTypes = {
    onHide: PropTypes.func.isRequired, 
    jobid: PropTypes.number.isRequired, 
};

export default Apply;