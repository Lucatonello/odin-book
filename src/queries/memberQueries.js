const API_URL = 'http://localhost:10000/members/';
const token = localStorage.getItem('token');

const memberQueries = {
    getUserData: async (type, id) => {
        return await fetch(`${API_URL}getUserData/${type}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getCompanyData: async (type, id) => {
        return await fetch(`${API_URL}getCompanyData/${type}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getMemberActivity: async (type, id) => {
        return await fetch(`${API_URL}getMemberActivity/${type}/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getUserExperience: async (id) => {
        return await fetch(`${API_URL}getUserExperience/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getUserEducation: async (id) => {
        return await fetch(`${API_URL}getUserEducation/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    getUserSkills: async (id) => {
        return await fetch(`${API_URL}getUserSkills/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    updateUserIntro: async(filteredData, userid) => {
        return await fetch(`${API_URL}updateUserIntro/${userid}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredData),
        });
    },
    updateUserAbout: async (userid, newAbout) => {
        return await fetch(`${API_URL}updateUserAbout/${userid}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newAbout }),
        })
    }
}

export default memberQueries