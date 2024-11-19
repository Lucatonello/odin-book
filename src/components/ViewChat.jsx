import { useState, useEffect, useRef } from "react";
import messagesQueries from '../queries/messagesQueries';
import defaultpfp from '../images/user.png'

import styles from '../styles/messages.module.css';

function ViewChat({ chatId1, chatId2, contactUsername }) {
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');

    const username = localStorage.getItem('username');
    const userid = localStorage.getItem('authorid');

    const chatSectionRef = useRef(null);

    useEffect(() => {
        const getChatDetails = async () => {
            const response = await messagesQueries.getChatDetails(chatId1, chatId2);
            const data = await response.json();
            console.log('chat: ', data);
            setChat(data);
            setIsLoading(false);
            scrollToBottom();
        }
        getChatDetails();
    }, [chatId1, chatId2]);

    useEffect(() => {
        scrollToBottom();
    }, [chat]);

    const scrollToBottom = () => {
        if (chatSectionRef.current) {
            chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (newMessage !== '') {
            const receiverid = userid == chat[0].receiverid ? chat[0].senderid : chat[0].receiverid;
            const response = await messagesQueries.sendMessage(newMessage, userid, receiverid);
            const result = await response.json();
    
            if (result.isDone) {
                const newMessageObj = {
                    //temporary id until page refresh
                    id: Date.now(),
                    username: username,
                    text: newMessage,
                    senderid: userid,
                }
                setChat((prevChats) => [...prevChats, newMessageObj]);
                setNewMessage('');
            }
        }
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <div className={'ghegegeagiuagb'}>
            <p>{contactUsername}</p>
            <hr />
            <div className={styles.chatSection} ref={chatSectionRef}>
                {chat.map(message => (
                    <div key={message.id}>
                        <div style={{ display: 'flex' }}>
                            <img src={defaultpfp} alt="Profile picture" style={{ height: '40px', width: '40px' }} />
                            <strong className={styles.textUsername}>{message.username}</strong>
                        </div>
                        <p className={styles.textMessage}>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className={styles.newMessageContainer}>
                <form onSubmit={handleSendMessage}>
                    <textarea 
                        type="text" 
                        placeholder="Write a message..." 
                        className={styles.newMessage} 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <button 
                            type="submit" 
                            className={newMessage.length !== 0 ? styles.sendActive : styles.sendUnactive}
                        >Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ViewChat;