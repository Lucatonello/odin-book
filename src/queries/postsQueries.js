const API_URL = 'http://localhost:10000/posts/';
const token = localStorage.getItem('token');

const postsQueries = {
    getAllPosts: async () => {
        return await fetch(`${API_URL}getAllPosts`, {
            method: 'GET',
            Authorization: `Bearer ${token}` 
        });
    },
}

export default postsQueries;