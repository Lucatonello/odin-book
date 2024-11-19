import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import postsQueries from '../queries/postsQueries';
import Navbar from "./Navbar";
import defaultpfp from '../images/user.png';
import Comments from "./Comments";

import styles from '../styles/ViewPost.module.css';

function ViewPost() {
    const [postData, setPostData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate()

    const type = localStorage.getItem('type');
    const userid = localStorage.getItem('authorid');

    useEffect(() => {
        const getPostData = async () => {
            const response = await postsQueries.getPostData(id, userid, type);
            const data = await response.json();
            console.log('post data', data);
            setPostData(data[0]);
            setIsLoading(false);
        }
        getPostData();
    }, [id, userid, type]);

    const handleAddLike = async (postid) => {
        try {
            const response = await postsQueries.addOneLike(userid, type, postid);
            const result = await response.json();
            if (result.isDone) window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    if (isLoading) {
        return <p className={styles.loadingMessage}>Loading...</p>
    }

    return (
        <>
            <Navbar tab={'home'}/>
            {postData && (
                    <div className={styles.postContainer}>
                    <div className={styles.top}>
                                    <img src={defaultpfp} alt="profile picture" style={{ height: '47.99px', width: '47.99px' }} />
                                    <div>
                                        <strong onClick={() => navigate(`/profile/${postData.type}/${postData.author_id}`)} className={styles.authorName} style={{ marginLeft: '10px' }}>{postData.author_name}</strong>
                                        <p className={styles.infoTop} style={{ color: '#666666' }}>{postData.author_summary}</p>
                                        <p style={{ margin: '5px 0px 0px 10px' }}>{postData.post_date ? postData.date : '10/21/24'}</p>
                                    </div>
                                </div>

                                <p>{postData.text}</p>
                                <p style={{ fontSize: '13px' }}>👍{postData.total_likes}</p>
                                <hr />
                                <div className={styles.bottom}>
                                    <div className={styles.section} onClick={() => handleAddLike(postData.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={postData.has_liked ? '#3890e8' : '#5f6368'} height="24px" viewBox="0 -960 960 960" width="24px">
                                            <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/>
                                        </svg> <p className={postData.has_liked ? styles.hasLiked: null} style={{ margin: '0px 10px 0px 5px', alignSelf: 'flex-end' }}>Like</p>
                                    </div>
                                </div>
                            <Comments comments={postData.comments} postid={postData.id}/>
                    </div>
            )}
        </>
    )
}

export default ViewPost;