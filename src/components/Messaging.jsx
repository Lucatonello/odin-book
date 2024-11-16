import { useEffect, useState } from "react";
import messagesQueries from "../queries/messagesQueries.js";
import Navbar from "./Navbar.jsx";
import defaultpfp from '../images/user.png'
import ViewChat from './ViewChat.jsx';

import styles from '../styles/messages.module.css';

function Messaging() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chatId1, setChatId1] = useState(null);
    const [chatId2, setChatId2] = useState(null);
    const [contactUsername, setContactUsername] = useState('');

    const userid = localStorage.getItem('authorid');

    useEffect(() => {
        const getMessages = async () => {
            const response = await messagesQueries.getMessages(userid);
            const data = await response.json();
            setMessages(data);
            console.log('messages: ', data);
            setIsLoading(false);
        }
        getMessages();
    }, [userid]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Navbar tab={'messaging'} />
            <div className={styles.pageContainer}>
                <h2 style={{ fontSize: '16px', padding: '0px 4px 0px 16px'}}>Messaging</h2>
                <div className={styles.pageGrid}>
                    <div style={{ overflowY: 'scroll' }}>
                        <ul>
                            {messages.map(message => (
                                <li key={message.id}>
                                    <div className={styles.messageContainer} onClick={() => {
                                            setChatId1(message.first_sender_id);
                                            setChatId2(message.first_receiver_id);
                                            setContactUsername(message.contact_username);
                                        }}>
                                        <div>
                                            <img src={defaultpfp} style={{ height: '55.99px', width: '55.99px' }} alt="Profile picture" />
                                        </div>
                                        <div>
                                            <strong style={{ margin: '3px 0px 0px 8px'}}>{message.contact_username}</strong>
                                            <p style={{ margin: '3px 0px 0px 8px', color: '#666666' }}>{message.last_message}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ padding: '10px' }}>
                        {chatId1 !== null && contactUsername !== '' && <ViewChat chatId1={chatId1} contactUsername={contactUsername} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messaging;