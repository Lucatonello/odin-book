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
    },
    newPost: async (newPost, id, type) => {
        return await fetch(`${API_URL}newPost`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ newPost, id, type })
        });
    },
    getMemberNotifications: async (userid, type) => {
        return await fetch(`${API_URL}getMemberNotifications/${userid}/${type}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        })
    }
}

export default postsQueries;