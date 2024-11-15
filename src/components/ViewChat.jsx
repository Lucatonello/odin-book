import { useState, useEffect } from "react";
import messagesQueries from '../queries/messagesQueries';

function ViewChat({ chatId1, chatId2, contactUsername }) {
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getChatDetails = async () => {
            const response = await messagesQueries.getChatDetails(chatId1, chatId2);
            const data = await response.json();
            console.log('chat: ', data);
            setChat(data);
            setIsLoading(false);
        }
        getChatDetails();
    }, [chatId1, chatId2]);

    if (isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <div className={'ghegegeagiuagb'}>
            <p>{contactUsername}</p>
            <hr />
            <div>
                {chat.map(message => (
                    <div key={message.id}>
                        <p>{message.username}</p>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewChat;