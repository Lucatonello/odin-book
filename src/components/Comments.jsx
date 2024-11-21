import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import postsQueries from '../queries/postsQueries';
import defaultpfp from '../images/user.png';
import styles from '../styles/Comments.module.css';
import { useNavigate } from 'react-router-dom';

function Comments({ comments, postid }) {
    const [newComment, setNewComment] = useState('');
    const [updatedComments, setUpdatedComments] = useState(comments); 

    const id = localStorage.getItem('authorid');
    const type = localStorage.getItem('type');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();


    useEffect(() => {
        setUpdatedComments(comments);
    }, [comments]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await postsQueries.addComment(newComment, id, postid, type);
            const result = await response.json();

            if (result.isDone) {
                setNewComment("");

                setUpdatedComments([
                    ...updatedComments,
                    {
                        text: newComment,
                        authorName: username,
                        authorid: id,
                        type: type,
                    },
                ]);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.top}>
                    <img src={defaultpfp} alt="profile pic" style={{ height: '47.99px', width: '47.99px' }} />
                    <input 
                        type="text"
                        placeholder='Add comment...'
                        value={newComment}
                        className={styles.newComment}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    {newComment.length !== 0 && <button 
                                                    className={styles.save} 
                                                    type='submit'
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Comment    
                                                </button>}
                </div>
            </form>

            {postid !== null ? (
                <ul>
                    {updatedComments.map((comment, index) => (
                        <li key={index}>
                            <div className={styles.commentTop}>
                                <img src={defaultpfp} alt="profile pic" style={{ height: '47.99px', width: '47.99px' }} />
                                <div className={comment.type === 'company' ? styles.companyCommentTop : ''}>
                                    <strong onClick={() => navigate(`/profile/${comment.type}/${comment.authorid}`)} className={styles.infoTop}>
                                        {comment.authorName}
                                    </strong>
                                    {comment.summary && <p style={{ color: '#666666', margin: '5px 0px 0px 10px' }}>{comment.authorSummary}</p>}
                                </div>
                            </div>
                            <p style={{ margin: '0px 0px 25px 60px' }}>{comment.text}</p>
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
            text: PropTypes.string.isRequired,
            authorName: PropTypes.string.isRequired,
            authorSummary: PropTypes.string.isRequired,
            authorid: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
        })
    ).isRequired,
    postid: PropTypes.number.isRequired,
};

export default Comments;