import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import messagesQueries from "../queries/messagesQueries";

import styles from '../styles/newMessage.module.css'

function NewmEssageForm({ userDetails, onHide }) {
    const [newMessage, setNewMessage] = useState('');

    const userid = localStorage.getItem('authorid');
    const navigate = useNavigate();

    const handleSend = async (e) => {
        e.preventDefault();

        const response = await messagesQueries.sendMessage(newMessage, userid, userDetails.receiverid);
        const result = await response.json();

        if (result.isDone) {
            navigate('/messaging')
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <p style={{ margin: '0' }}>New messge</p>
                    <svg className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <strong>{userDetails.username}</strong>
                <p style={{ margin: '5px 0', color: '#666666' }}>{userDetails.summary}</p>
                <form onSubmit={handleSend}>
                    <textarea
                        type='text'
                        value={newMessage}
                        placeholder="Write a message..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        className={styles.messageInput}
                    />
                    <hr />
                    <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                        <button type="submit" className={styles.send}>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

NewmEssageForm.propTypes = {
    userDetails: PropTypes.object,
    onHide: PropTypes.func
}

export default NewmEssageForm;