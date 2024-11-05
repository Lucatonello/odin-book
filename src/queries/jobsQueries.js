const API_URL = 'http://localhost:10000/jobs/';
const token = localStorage.getItem('token');

const jobsQueries = {
    getAllJobs: async () => {
        return await fetch(`${API_URL}getAllJobs`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    },
    getJobInfo: async (id) => {
        return await fetch(`${API_URL}getJobInfo/${id}`, {
            method: 'GET',
            headers: {
                Authorization: 'application/json'
            }
        });
    },
    newJobPost: async (companyid, filteredData) => {
        return await fetch(`${API_URL}newJobPost/${companyid}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(filteredData)
        });
    },
    applyToJob: async (formData) => {
        return await fetch(`${API_URL}applyToJob/${formData.get('jobid')}/${formData.get('userid')}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });
    }
}

export default jobsQueries;