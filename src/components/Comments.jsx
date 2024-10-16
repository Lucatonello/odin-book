import PropTypes from 'prop-types';

function Comments({ comments }) {
    console.log('comments the component receives ', comments);
    return (
        <div>
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