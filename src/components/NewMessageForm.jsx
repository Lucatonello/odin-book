import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import messagesQueries from "../queries/messagesQueries";

import styles from '../styles/newMessage.module.css'

function NewmEssageForm({ userDetails, onHide }) {
    const [newMessage, setNewMessage] = useState('');

    const userid = localStorage.getItem('authorid');
    const navigate = useNavigate();

    const handleSend = async () => {
        const response = await messagesQueries.sendMessage(newMessage, userid, userDetails.receiverid);
        const result = await response.json();

        if (result.isDone) {
            navigate('/messaging')
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <p>New messge</p>
                <hr />
                <strong>{userDetails.username}</strong>
                <p>{userDetails.summary}</p>
                <form onSubmit={handleSend}>
                    <textarea
                        type='text'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <hr />
                    <div>
                        <button type="submit">Send</button>
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