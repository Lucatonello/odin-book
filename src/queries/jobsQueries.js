const API_URL = 'https://odin-book-backend-production-9572.up.railway.app/jobs/';
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
    getJobInfo: async (jobid, userid) => {
        return await fetch(`${API_URL}getJobInfo/${jobid}/${userid}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    },
    newJobPost: async (companyid, filteredData) => {
        console.log(filteredData);
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
    },
    getJobApplicants: async (jobId) => {
        return await fetch(`${API_URL}getJobApplicants/${jobId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }
}

export default jobsQueries;