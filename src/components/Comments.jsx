import PropTypes from 'prop-types';
import { useState } from 'react';
import postsQueries from '../queries/postsQueries';

function Comments({ comments, postid }) {
    const [newComment, setNewComment] = useState('');
    console.log('props In comments: ', comments);
    const id = localStorage.getItem('authorid'); 
    const type = localStorage.getItem('type');

    const handleSubmit = async () => {
        try {
            await postsQueries.addComment(newComment, id, postid, type);
            setNewComment("");
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
            {postid !== null ? (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            <strong>{comment.authorOrcompanyName}</strong>
                            <p>{comment.text}</p>
                        </li>
                    ))} 
                </ul>
            ) : ''}
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
    postid: PropTypes.number.isRequired,
};

export default Comments;