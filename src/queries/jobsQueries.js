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
    }
}

export default jobsQueries;