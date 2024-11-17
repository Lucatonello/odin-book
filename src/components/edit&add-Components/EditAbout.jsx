// This file will update both user and company about sections
import { useState } from "react";
import PropTypes from 'prop-types';
import styles from '../../styles/EditProfile.module.css'
import memberQueries from "../../queries/memberQueries";

function EditAbout({ onHide, memberData }) {
    const [newAbout, setNewAbout] = useState(memberData.about);

    const userid = localStorage.getItem('authorid');
    const type = localStorage.getItem('type');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type === 'user') {
            const response = await memberQueries.updateUserAbout(userid, newAbout);
            const result = await response.json();
            console.log(result);
            if (result.isDone) window.location.reload();
        } else if (type === 'company') {
            const response = await memberQueries.updateCompanyAbout(userid, newAbout);
            const result = await response.json();
            if (result.isDone) window.location.reload();
        } else {
            console.error('Type not valid');
            return;
        }
    }
    return (
        <div className={styles.overlay} onClick={onHide}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.top}>
                    <h1 style={{ margin: '5px 0px'}}>Edit about</h1>
                    <svg style={{ margin: '5px 0px'}} className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend style={{ color: '#666666' }}>{type == 'user' ? (
                        'You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.'
                        ) : (
                            'Share your company’s story, industry expertise, and accomplishments. You can highlight your core values, milestones, and any notable projects or partnerships. Many companies also use this space to showcase their impact, team culture, and vision for the future.'
                            )}
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