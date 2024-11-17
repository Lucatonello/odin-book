const API_URL = 'http://localhost:10000/messages/';
const token = localStorage.getItem('token');

const messagesQueries = {
    getMessages: async (userid) => {
        return await fetch(`${API_URL}getMessages/${userid}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
    },
    getChatDetails: async (chatId1, chatId2) => {
        return await fetch(`${API_URL}getChatDetails/${chatId1}/${chatId2}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
    },
    sendMessage: async (newMessage, senderid, receiverid) => {
        console.log('message ids: ', senderid, receiverid);
        return await fetch(`${API_URL}sendMessage/${senderid}/${receiverid}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ newMessage })
        });
    }
}

export default messagesQueries;