import PropTypes from 'prop-types';
import { useState } from 'react';
import postsQueries from '../queries/postsQueries';
import defaultpfp from '../images/user.png';
import styles from '../styles/Comments.module.css';

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
                        <li className={styles.comment} key={index}>
                            <div className={styles.top}>
                                <img src={defaultpfp} alt="profile pic" style={{ height: '47.99px', width: '47.99px' }} />
                                <strong>{comment.authorOrcompanyName}</strong>
                                <p></p>
                            </div>
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