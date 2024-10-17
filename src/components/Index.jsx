import { useState, useEffect } from "react";
import postsQueries from '../queries/postsQueries';
import Comments from './Comments';
import NewPost from './NewPost';
import Navbar from './Navbar';
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
            <ul>
                {posts.map(post => (
                    <li style={{ border: '1px solid black' }} key={post.id}>
                        <strong>{post.author_name}</strong>
                        <p>{post.text}</p>
                        <p>👍{post.total_likes}</p>
                        <button type="button" onClick={() => handleAddLike(post.id)}>Like</button>
                        <button type="button" onClick={() => setShowComments(post.id)}>Comment</button>

                        {showComments == post.id && <Comments comments={post.comments} postid={post.id}/>}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Index;