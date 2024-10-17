import { useState } from "react";
import postsQueries from '../queries/postsQueries';

function NewPost ({ onHide }) {
    const [newPost, setNewPost] = useState('');

    const username = localStorage.getItem('username');
    const id = localStorage.getItem('authorid')
    const type = localStorage.getItem('type')

    const handleSubmit = async () => {
        try {
            await postsQueries.newPost(newPost, id, type);
            setNewPost("");
        } catch (err) {
            console.error(err);
        }
    }

 return (
    <div style={{ border: '1px solid black' }}>
        <h1>{username}</h1>
        <button type="button" onClick={onHide}>X</button>
        <form onSubmit={handleSubmit}>
            <textarea 
                name="newPost" 
                placeholder="What do you want to talk about?" 
                cols={90} rows={20} 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                style={{ border: '0px' }}
            />
            <hr />
            <button type="submit">Post</button>
        </form>
    </div>
 )
}

export default NewPost;