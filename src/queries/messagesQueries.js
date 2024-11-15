const API_URL = 'http://localhost:10000/messages/';
const token = localStorage.getItem('token');

const messagesQueries = {
    getMessages: async (userid) => {
        return await fetch(`${API_URL}getMessages/${userid}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'application/json'
            }
        });
    },
    getChatDetails: async (chatId1, chatId2) => {
        return await fetch(`${API_URL}getChatDetails/${chatId1}/${chatId2}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'application/json'
            }
        });
    }
}

export default messagesQueries;