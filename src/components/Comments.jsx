import PropTypes from 'prop-types';
import { useState } from 'react';
import postsQueries from '../queries/postsQueries';

function Comments({ comments }) {
    const [newComment, setNewComment] = useState('');
    
    const id = localStorage.getItem('authorid'); 
    const type = localStorage.getItem('type');
    const postid = comments[0].postid;

    const handleSubmit = async () => {
        try {
            await postsQueries.addComment(newComment, id, postid, type);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder='Add comment...'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                {newComment.length !== 0 && <button type='submit'>Comment</button>}
            </form>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.authorOrcompanyName}</strong>
                        <p>{comment.text}</p>
                    </li>
                ))} 
            </ul>
        </div>
    );
}

Comments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            authorOrcompanyName: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Comments;