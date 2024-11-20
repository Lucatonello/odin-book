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
            description,
            skills
        }
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value?.length > 0)
        );
        const response = await jobsQueries.newJobPost(companyid, filteredData);
        const result = await response.json();

        if (result.isDone) {
            window.location.reload();
        }
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setJobType(newType);
    };
    const handleExpLevelChange = (e) => {
        const newLevel = e.target.value;
        setExpLevel(newLevel);
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
                    <div style={{ display: 'flex' }}>
                        <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={jobType} onChange={handleTypeChange}>
                            <option value=" " disabled>Please select</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Apprenticeship">Apprenticeship</option>
                            <option value="Seasonal">Seasonal</option>
                        </select>
                    </div>
                    
                    <legend>Experience Level</legend>
                    <div style={{ display: 'flex' }}>
                        <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={expLevel} onChange={handleExpLevelChange}>
                            <option value=" " disabled>Please select</option>
                            <option value="Internship">Internship</option>
                            <option value="Entry-level">Entry-level</option>
                            <option value="Mid-level">Mid-level</option>
                            <option value="Senior">Senior</option>
                            <option value="Lead">Lead</option>
                            <option value="Director">Director</option>
                            <option value="Executive">Executive</option>
                        </select>
                    </div>
                    
                    <legend>Annual Salary</legend>
                    <input 
                        type="number"
                        value={salary || ''}
                        className={styles.input}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                    
                    <legend>Location</legend>
                    <input 
                        type="text"
                        value={location}
                        className={styles.input}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    
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