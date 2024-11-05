import { useState } from "react";
import PropTypes from 'prop-types';
import styles from '../../styles/EditProfile.module.css'

function NewJobPost({ onHide, companyid }) {
    const [title, setTitle] = useState('');
    const [area, setArea] = useState('');
    const [jobType, setJobType] = useState('');
    const [expLevel, setExpLevel] = useState('');
    const [salary, setSalary] = useState(null);
    const [location, setLocation] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        return
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h1 style={{ margin: '5px 0px'}}>Create a Job post</h1>
                    <svg style={{ margin: '5px 0px'}} className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend>Position title *</legend>
                    <input 
                        type="text"
                        value={title}
                        className={styles.input}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <legend>Area </legend>
                    <input 
                        type="text"
                        value={area}
                        className={styles.input}
                        onChange={(e) => setArea(e.target.value)}
                    />
                    
                    <legend>Job Type</legend>
                    <input 
                        type="text"
                        value={jobType}
                        className={styles.input}
                        onChange={(e) => setJobType(e.target.value)}
                    />
                    
                    <legend>Experience Level</legend>
                    <input 
                        type="text"
                        value={expLevel}
                        className={styles.input}
                        onChange={(e) => setExpLevel(e.target.value)}
                    />
                    
                    <legend>Salary</legend>
                    <input 
                        type="number"
                        value={salary || ''}
                        className={styles.input}
                        onChange={(e) => setSalary(Number(e.target.value))}
                    />
                    
                    <legend>Location</legend>
                    <input 
                        type="text"
                        value={location}
                        className={styles.input}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <div style={{ display: 'flex', marginBottom: '24px' }}>
                        <legend>Public *</legend>
                        <select 
                            value={isPublic ? 'Yes' : 'No'} 
                            onChange={(e) => setIsPublic(e.target.value === 'Yes')}
                            className={styles.select}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    
                    <legend>Description</legend>
                    <textarea 
                    style={{ border: '1px solid black', borderRadius: '7px' }}
                        value={description}
                        className={styles.textarea}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <hr />
                    <div className={styles.bottom}>
                        <button type="submit" className={styles.save}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
NewJobPost.propTypes = {
    onHide: PropTypes.func.isRequired, 
    companyid: PropTypes.number.isRequired, 
};

export default NewJobPost;