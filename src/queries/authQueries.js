const API_URL = 'http://localhost:10000/users/';

const authQueries = {
    loginUser: async(username, password, type) => {
        return await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, type })
        });
    },
    loginCompany: async(companyName, companyPassword, type) => {
        return await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ companyName, companyPassword, type })
        });
    },
    signup: async(formData) => {
        return await fetch(`${API_URL}signup`, {
            method: 'POST',
            body: formData
        });
    },
};

export default authQueries;