import { useState } from "react";
import PropTypes from 'prop-types';
import styles from '../../styles/EditProfile.module.css'
import memberQueries from "../../queries/memberQueries";

function EditCompanyIntro({ onHide, memberData }) {
    const [newUsername, setNewUsername] = useState(memberData.name);
    const [newLocation, setNewLocation] = useState(memberData.location);
    const [newWebsite, setNewWebsite] = useState(memberData.website);

    const userid = localStorage.getItem('authorid')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newData = {
            name: newUsername,
            location: newLocation,
            website: newWebsite
        }
        const filteredData = Object.fromEntries(
            // eslint-disable-next-line no-unused-vars
            Object.entries(newData).filter(([key, value]) => value.length > 0)
        );

        if ('name' in filteredData ) {
            localStorage.setItem('username', filteredData.name)
        }

        console.log('f data', filteredData);
        const response = await memberQueries.updateCompanyIntro(filteredData, userid);
        const result = await response.json();
        
        if (result.isDone) {
            window.location.reload();
        }
    }
    return (
        <div className={styles.overlay} onClick={onHide}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <h1 style={{ margin: '5px 0px'}}>Edit intro</h1>
                    <svg style={{ margin: '5px 0px'}} className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend>Company name*</legend>
                    <input 
                        type="text" 
                        value={newUsername}
                        className={styles.input}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <legend>Location</legend>
                    <input 
                        type="text"
                        value={newLocation}
                        placeholder={'Ex: United States'} 
                        className={styles.input}
                        onChange={(e) => setNewLocation(e.target.value)}
                    />
                    <legend>Website</legend>
                    <input 
                        type="text"
                        value={newWebsite}
                        className={styles.input}
                        onChange={(e) => setNewWebsite(e.target.value)}
                    />
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className={styles.save} type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

EditCompanyIntro.propTypes = {
    onHide: PropTypes.func.isRequired, 
    memberData: PropTypes.object.isRequired, 
};

export default EditCompanyIntro;