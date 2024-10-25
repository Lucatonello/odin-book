import { useState } from "react";
import PropTypes from 'prop-types';
import memberQueries from "../../queries/memberQueries";
import styles from '../../styles/EditProfile.module.css'


function NewSkill({ onHide, userId }) {
    const [skill, setSkill] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await memberQueries.newSkill(userId, skill);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h1>Add skill</h1>
                    <svg className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend>Skill*</legend>
                    <input 
                        type="text"
                        className={styles.input}
                        value={skill}
                        placeholder="Skill (ex: Project Management)"
                        onChange={(e) => setSkill(e.target.value)} 
                    />
                    <hr />
                    <div className={styles.bottom}>
                        <button type="submit" className={styles.save}>Save</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

NewSkill.propTypes = {
    onHide: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
};

export default NewSkill;