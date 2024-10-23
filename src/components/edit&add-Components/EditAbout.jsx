import { useState } from "react";
import PropTypes from 'prop-types';
import styles from '../../styles/EditProfile.module.css'
import memberQueries from "../../queries/memberQueries";

function EditAbout({ onHide, memberData }) {
    const [newAbout, setNewAbout] = useState(memberData.about);

    const userid = localStorage.getItem('authorid');

    const handleSubmit = async (e) => {
        e.preventDefault()

        await memberQueries.updateUserAbout(userid, newAbout);
    }
    return (
        <div className={styles.overlay} onClick={onHide}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h1 style={{ margin: '5px 0px'}}>Edit about</h1>
                    <svg style={{ margin: '5px 0px'}} className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend style={{ color: '#666666' }}>You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.
                    </legend>
                    <textarea 
                        type="text" 
                        value={newAbout}
                        className={styles.input}
                        onChange={(e) => setNewAbout(e.target.value)}
                    />
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className={styles.save} type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

EditAbout.propTypes = {
    onHide: PropTypes.func.isRequired, 
    memberData: PropTypes.object.isRequired, 
};

export default EditAbout;