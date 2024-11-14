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
    getChatDetails: async (chatid) => {
        return await fetch(`${API_URL}getChatDetails/${chatid}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'application/json'
            }
        });
    }
}

export default messagesQueries;