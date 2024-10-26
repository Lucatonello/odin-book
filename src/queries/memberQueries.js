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
    },
    newExperience: async (userid, filteredData) => {
        return await fetch(`${API_URL}newExperience/${userid}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredData)
        });
    },
    editExperience: async (userid, expid, filteredData) => {
        return await fetch(`${API_URL}editExperience/${userid}/${expid}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredData)
        })
    },
    deleteExperience: async (expid) => {
        return await fetch(`${API_URL}deleteExperience/${expid}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    },
    newEducation: async (userid, filteredData) => {
        return await fetch(`${API_URL}newEducation/${userid}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredData)
        })
    },
    editEducation: async (userid, educationid, filteredData) => {
        return await fetch(`${API_URL}editEducation/${userid}/${educationid}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filteredData)
        });
    },
    deleteEducation: async (educationid) => {
        return await fetch(`${API_URL}deleteEducation/${educationid}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    },
    newSkill: async (userId, skill) => {
        return await fetch(`${API_URL}newSkill/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill: skill })
        });
    },
    deleteSkill: async (skillid) => {
        return await fetch(`${API_URL}deleteSkill/${skillid}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }
}

export default memberQueries