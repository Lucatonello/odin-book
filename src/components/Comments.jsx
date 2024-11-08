import PropTypes from 'prop-types';
import { useState } from 'react';
import postsQueries from '../queries/postsQueries';
import defaultpfp from '../images/user.png';
import styles from '../styles/Comments.module.css';
import { useNavigate } from 'react-router-dom';

function Comments({ comments, postid }) {
    const [newComment, setNewComment] = useState('');
    console.log('props In comments: ', comments);
    const id = localStorage.getItem('authorid'); 
    const type = localStorage.getItem('type');

    const navigate = useNavigate();

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
                <div className={styles.top}>
                    <img src={defaultpfp} alt="profile pic" style={{ height: '47.99px', width: '47.99px' }} />
                    <input 
                        type="text"
                        placeholder='Add comment...'
                        value={newComment}
                        className={styles.newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    {newComment.length !== 0 && <button className={styles.save} type='submit'>Comment</button>}
                </div>
                
            </form>
            {postid !== null ? (
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            <div className={styles.commentTop}>
                                <img src={defaultpfp} alt="profile pic" style={{ height: '47.99px', width: '47.99px' }} />
                                <div className={comment.type == 'company' ? styles.companyCommentTop : ''}>
                                    <strong onClick={() => navigate(`/profile/${comment.type}/${comment.authorid}`)} className={styles.infoTop}>{comment.authorName}</strong>
                                    {comment.summary !== '' && <p style={{ color: '#666666', margin: '5px 0px 0px 10px' }}>{comment.authorSummary}</p>}
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
        })
    ).isRequired,
    postid: PropTypes.number.isRequired,
};

export default Comments;