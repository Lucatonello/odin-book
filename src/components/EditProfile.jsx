/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from '../styles/EditProfile.module.css'
import memberQueries from "../queries/memberQueries";

function EditProfile({ onHide, memberData }) {
    const [newUsername, setNewUsername] = useState('');
    const [newSummary, setNewSummary] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newWebsite, setNewWebsite] = useState('');

    const userid = localStorage.getItem('authorid')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newData = {
            username: newUsername,
            summary: newSummary,
            location: newLocation,
            website: newWebsite
        }
        const filteredData = Object.fromEntries(
            // eslint-disable-next-line no-unused-vars
            Object.entries(newData).filter(([key, value]) => value.length > 0)
        );
        console.log('f data', filteredData);
        await memberQueries.updateUserIntro(filteredData, userid);
    }
    return (
        <div className={styles.overlay} onClick={onHide}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>
                <h1>Edit intro</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend>Full name*</legend>
                    <input 
                        type="text" 
                        value={newUsername}
                        placeholder={memberData.username}
                        className={styles.input}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />

                    <legend>Summary</legend>
                    <input 
                        type="text"
                        value={newSummary} 
                        placeholder={memberData.summary}
                        className={styles.input}
                        onChange={(e) => setNewSummary(e.target.value)}
                    />
                    <legend>Location</legend>
                    <input 
                        type="text"
                        value={newLocation}
                        placeholder={memberData.location} 
                        className={styles.input}
                        onChange={(e) => setNewLocation(e.target.value)}
                    />
                    <legend>Website</legend>
                    <input 
                        type="text"
                        value={newWebsite}
                        placeholder={memberData.website} 
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

export default EditProfile;