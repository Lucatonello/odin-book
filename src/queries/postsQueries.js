const API_URL = 'https://odin-book-backend-production-9572.up.railway.app/posts/';
const token = localStorage.getItem('token');

const postsQueries = {
    getAllPosts: async (userid, type) => {
        return await fetch(`${API_URL}getAllPosts/${userid}/${type}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}` 
            }
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
        console.log('after making the request: ', newPost, id, type);
        console.log(`making a request to: ${API_URL}newPost`);
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
        });
    },
    getPostData: async (postid, userid, type) => {
        return await fetch(`${API_URL}getPostData/${postid}/${userid}/${type}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        });
    }
}

export default postsQueries;