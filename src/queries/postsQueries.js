const API_URL = 'http://localhost:10000/posts/';
const token = localStorage.getItem('token');

const postsQueries = {
    getAllPosts: async () => {
        return await fetch(`${API_URL}getAllPosts`, {
            method: 'GET',
            Authorization: `Bearer ${token}` 
        });
    },
    addOneLike: async (id, type, postid) => {
        return await fetch(`${API_URL}addOneLike`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ id, type, postid })
        });
    },
    addComment: async (newComment, id, postid, type) => {
        return await fetch(`${API_URL}addComment`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ newComment, id, postid, type })
        });
    }
}

export default postsQueries;