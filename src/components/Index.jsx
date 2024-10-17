import { useState, useEffect } from "react";
import postsQueries from '../queries/postsQueries';
import Comments from './Comments';
import NewPost from './NewPost';

function Index() {
    const [posts, setPosts] = useState([]);

    const [showComments, setShowComments] = useState(false);
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
            <button type="button" onClick={() => setShowNewPost(true)}>Start posting...</button>
            {showNewPost && <NewPost onHide={() => setShowNewPost(false)} />}
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <strong>{post.author_name}</strong>
                        <p>{post.text}</p>
                        <p>👍{post.total_likes}</p>
                        <button type="button" onClick={() => handleAddLike(post.id)}>Like</button>
                        <button type="button" onClick={() => setShowComments(true)}>Comment</button>

                        {showComments && <Comments comments={post.comments}/>}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Index;