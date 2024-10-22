import { useState } from "react";
import postsQueries from '../../queries/postsQueries';
import styles from '../../styles/NewPost.module.css'

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
    <div className={styles.overlay}>
        <div className={styles.container}>
            <div className={styles.top}>
                <h1>{username}</h1>
                <svg className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea 
                    name="newPost" 
                    placeholder="What do you want to talk about?" 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    style={{ border: '0px' }}
                />
                <hr />
                <div className={styles.bottom}>
                    <button className={styles.post} type="submit">Post</button>
                </div>
            </form>
        </div>
    </div>
 )
}

export default NewPost;