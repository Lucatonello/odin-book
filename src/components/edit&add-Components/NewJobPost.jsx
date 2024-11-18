/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from 'prop-types';
import styles from '../../styles/EditProfile.module.css'
import jobsQueries from "../../queries/jobsQueries";

function NewJobPost({ onHide, companyid }) {
    const [title, setTitle] = useState('');
    const [area, setArea] = useState('');
    const [jobType, setJobType] = useState('');
    const [expLevel, setExpLevel] = useState('');
    const [salary, setSalary] = useState(null);
    const [location, setLocation] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            area,
            jobType,
            expLevel,
            salary,
            location,
            isPublic,
            description,
            skills
        }
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value.length > 0)
        );
        const response = await jobsQueries.newJobPost(companyid, filteredData);
        const result = await response.json();

        if (result.isDone) {
            window.location.reload();
        }
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
                            value={isPublic ? true : false} 
                            onChange={(e) => setIsPublic(e.target.value === true)}
                            className={styles.select}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    
                    <legend>Description</legend>
                    <textarea 
                        value={description}
                        className={styles.input}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <legend>Skills (comma-separated)</legend>
                    <input 
                        type="text"
                        className={styles.input}
                        value={skills}
                        placeholder="Ex: Typescript, Node.js, CSS"
                        onChange={(e) => setSkills(e.target.value)}
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