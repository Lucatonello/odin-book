import { useState, useEffect } from "react";
import postsQueries from '../queries/postsQueries';

function Index() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await postsQueries.getAllPosts();
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Hello world</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.text}</li>
                ))}
            </ul>
        </div>
    )
}

export default Index;