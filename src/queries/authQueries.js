const API_URL = 'https://odin-book-backend-production-9572.up.railway.app/users/';

const authQueries = {
    loginUser: async(username, password, type) => {
        console.log('props query receives: ', username, password, type);
        return await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, type })
        });
    },
    loginCompany: async(companyName, companyPassword, type) => {
        console.log('props query receives: ', companyName, companyPassword, type);
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