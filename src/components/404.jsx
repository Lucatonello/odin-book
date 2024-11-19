import styles from '../styles/Network.module.css'
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
         }}>
            <h1>Oops! Looks like you are lost in the void</h1>
            <p>This page must’ve taken a day off. Let’s get you back on track:</p>
            <button onClick={() => navigate('/')} className={styles.connect}>Go to your feed</button>
        </div>
    )
}

export default NotFound;