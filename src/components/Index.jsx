import { useState, useEffect } from "react";
import postsQueries from '../queries/postsQueries';
import Comments from './Comments';
import NewPost from './NewPost';
import Navbar from './Navbar';
import defaultpfp from '../images/user.png';
import styles from '../styles/Index.module.css';

function Index() {
    const [posts, setPosts] = useState([]);

    const [showComments, setShowComments] = useState(null);
    const [showNewPost, setShowNewPost] = useState(false);

    const id = localStorage.getItem('authorid'); 
    const type = localStorage.getItem('type');

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await postsQueries.getAllPosts();
                const data = await response.json();
                setPosts(data);
                console.log('getAllPosts: ', data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts();
    }, []);

    const handleAddLike = async (postid) => {
        try {
            await postsQueries.addOneLike(id, type, postid);
            setPosts((prevPosts) => 
                prevPosts.map((post) => 
                    post.id === posts.id ? { ...post, likes: post.likes + 1 } : post
                )
            );
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Navbar />
            
            <button type="button" onClick={() => setShowNewPost(true)}>Start posting...</button>
            {showNewPost && <NewPost onHide={() => setShowNewPost(false)} />}
            <ul className={styles.postsContainer}>
                {posts.map(post => (
                    <li style={{ background: 'white', padding: '20px' }} key={post.id}>
                        <div className={styles.top}>
                            <img src={defaultpfp} alt="profile picture" style={{ height: '47.99px', width: '47.99px' }} />
                            <div>
                                <strong style={{ marginLeft: '10px' }}>{post.author_name}</strong>
                                <p style={{ margin: '5px 0px 0px 10px' }}>{post.post_date ? post.date : '10/21/24'}</p>
                            </div>
                        </div>

                        <p>{post.text}</p>
                        <p style={{ fontSize: '13px' }}>👍{post.total_likes}</p>
                        <hr />
                        <div className={styles.bottom}>
                            <div className={styles.section}>
                                <svg onClick={() => handleAddLike(post.id)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                    <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/>
                                </svg> <p style={{ margin: '0px 10px 0px 5px', alignSelf: 'flex-end' }}>Like</p>
                            </div>
                            <div className={styles.section}>
                                <svg onClick={() => setShowComments(post.id)} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                    <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                                </svg>
                                <p style={{ margin: '0px 10px 0px 5px', alignSelf: 'flex-end' }}>Comment</p>
                            </div>
                        </div>

                        {showComments == post.id && <Comments comments={post.comments} postid={post.id}/>}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Index;