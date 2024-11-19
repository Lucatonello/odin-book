import { useState, useEffect } from "react";
import postsQueries from '../queries/postsQueries';
import Comments from './Comments';
import NewPost from './edit&add-Components/NewPost';
import Navbar from './Navbar';
import defaultpfp from '../images/user.png';
import styles from '../styles/Index.module.css';
import { useNavigate } from "react-router-dom";

function Index() {
    const [posts, setPosts] = useState([]);

    const [showComments, setShowComments] = useState(null);
    const [showNewPost, setShowNewPost] = useState(false);

    const id = localStorage.getItem('authorid'); 
    const type = localStorage.getItem('type');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await postsQueries.getAllPosts(id, type);
                const data = await response.json();
                setPosts(data);
                console.log('getAllPosts: ', data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts();
    }, [id, type]);

    const handleAddLike = async (postid) => {
        try {
            const response = await postsQueries.addOneLike(id, type, postid);
            const result = await response.json();
    
            if (result.isDone) {
                const post = posts.find(post => post.id === postid);
                if (post) {
                    const updatedLikes = parseInt(post.total_likes) + 1; 
                    post.total_likes = updatedLikes;  
                    post.has_liked = true;
    
                    setPosts(prevPosts => 
                        prevPosts.map(p => p.id === postid ? { ...p, total_likes: updatedLikes, has_liked: true } : p)
                    );
                }
            }
        } catch (err) {
            console.error("Error adding like:", err);
        }
    };

    return (
        <div>
            <Navbar tab={'home'} />
            {showNewPost && <NewPost onHide={() => setShowNewPost(false)} />}

            <div className={styles.post} style={{ display: 'flex', marginTop: '20px' }}>
                <img src={defaultpfp} alt="profile picture" style={{ height: '47.99px', width: '47.99px' }} />
                <button onClick={() => setShowNewPost(true)} className={styles.startPosting}>
                    <strong style={{ color: '#666666' }}>Start a post, share your thoughts</strong>
                </button>
            </div>

            <ul className={styles.postsContainer}>
                {posts.map(post => (
                    <li className={styles.post} onClick={() => navigate(`/post/${post.id}`)} key={post.id}>
                        <div className={styles.top}>
                            <img src={defaultpfp} alt="profile picture" style={{ height: '47.99px', width: '47.99px' }} />
                            <div>
                                <strong onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/profile/${post.type}/${post.author_id}`)}
                                    } 
                                className={styles.authorName} style={{ marginLeft: '10px' }}>{post.author_name}</strong>
                                <p className={styles.infoTop} style={{ color: '#666666' }}>{post.author_summary}</p>
                                <p style={{ margin: '5px 0px 0px 10px' }}>{post.post_date ? post.date : '10/21/24'}</p>
                            </div>
                        </div>

                        <p>{post.text}</p>
                        <p style={{ fontSize: '13px' }}>👍{post.total_likes}</p>
                        <hr />
                        <div className={styles.bottom}>
                            <div className={styles.section} onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddLike(post.id)}
                                }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={post.has_liked ? '#3890e8' : '#5f6368'} height="24px" viewBox="0 -960 960 960" width="24px">
                                    <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/>
                                </svg> <p className={post.has_liked ? styles.hasLiked: null} style={{ margin: '0px 10px 0px 5px', alignSelf: 'flex-end' }}>
                                            Like
                                        </p>
                            </div>
                            <div onClick={(e) => {
                                    e.stopPropagation();
                                    setShowComments(post.id)}
                                } 
                                className={styles.section}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
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