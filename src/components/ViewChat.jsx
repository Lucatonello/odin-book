import { useState, useEffect } from "react";
import messagesQueries from '../queries/messagesQueries';

function ViewChat({ chatid }) {
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getChatDetails = async () => {
            const response = await messagesQueries.getChatDetails(chatid);
            const data = await response.json();
            console.log('chat: ', data);
            setChat(data);
            setIsLoading(false);
        }
        getChatDetails();
    }, [chatid]);

    if (isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <div>
            
        </div>
    )
}

export default ViewChat;