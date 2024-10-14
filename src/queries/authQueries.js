const API_URL = 'http://localhost:10000/users/';

const authQueries = {
    login: async(username, password) => {
        return await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
    },
    signup: async(formData) => {
        return await fetch(`${API_URL}signup`, {
            method: 'POST',
            body: JSON.stringify(formData)
        });
    }
};

export default authQueries;