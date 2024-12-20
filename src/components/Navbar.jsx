import { useState, useEffect } from 'react';
import linkedInIcon from '../images/linkedin.png';
import defaultpfp from '../images/user.png'
import styles from '../styles/Navbar.module.css';
import { useNavigate } from 'react-router-dom';

function Navbar(tab) {
    const [hideLabels, setHideLabels] = useState(false);
    const navigate = useNavigate();

    const type = localStorage.getItem('type');
    const id = localStorage.getItem('authorid');

    useEffect(() => {
        const handleResize = () => {
            setHideLabels(window.innerWidth <= 730);
        };
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async() => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <nav className={styles.navbar}>
            {/* LinkedIn Icon */}
            <div className={styles.logoSearchContainer}>
        <div className={styles.logo}>
            <img 
                src={linkedInIcon} 
                alt="LinkedIn Icon" 
                className={styles.icon}
                onClick={() => navigate('/')} 
                style={{ height: '40.99px', width: '40.99px' }}
            />
        </div>

        <div className={styles.search}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
            <path d="m788.48-81.56-256.95-257.4q-29.31 20.74-70.83 33.4-41.53 12.65-87.09 12.65-120.53 0-204.53-84.03-83.99-84.03-83.99-204.61 0-120.58 84.02-204.49 84.03-83.92 204.61-83.92 120.58 0 204.5 84 83.91 83.99 83.91 204.53 0 46.13-11.93 85.43-11.94 39.3-33.68 69.61l258.39 258.96-86.43 85.87Zm-415.1-334.31q70.24 0 118.02-47.54 47.77-47.55 47.77-117.79 0-70.25-47.77-118.02Q443.62-747 373.38-747q-70.25 0-117.79 47.78-47.55 47.77-47.55 118.02 0 70.24 47.55 117.79 47.54 47.54 117.79 47.54Z"/>
        </svg>
            <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
        </div>

            {/* Navbar Icons */}
            <div className={styles.navItems}>
                <div className={styles.navItem}>
                    <svg onClick={() => navigate('/')} fill={tab.tab === "home" ? '#1a1a1a' : '#666666'} className={styles.inactive} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
                    </svg>
                    {!hideLabels && <span>Home</span>}
                </div>
                {type == 'user' && (
                    <div className={styles.navItem}>
                        <svg onClick={() => navigate('/network')} xmlns="http://www.w3.org/2000/svg" fill={tab.tab === "network" ? '#1a1a1a' : '#666666'} className={styles.inactive} viewBox="0 0 24 24" >
                            <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z"></path>
                        </svg>
                        {!hideLabels && <span>My network</span>}
                    </div>
                )}

                <div className={styles.navItem}>
                    <svg onClick={() => navigate('/jobs')} fill={tab.tab === "jobs" ? '#1a1a1a' : '#666666'} className={styles.inactive} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm10 9a4 4 0 003-1.38V17a3 3 0 01-3 3H5a3 3 0 01-3-3v-4.38A4 4 0 005 14z"></path>
                    </svg>
                    {!hideLabels && <span>Jobs</span>}
                </div>

                <div className={styles.navItem}>
                    <svg onClick={() => navigate('/notifications')} xmlns="http://www.w3.org/2000/svg" fill={tab.tab === "notifications" ? '#1a1a1a' : '#666666'} className={styles.inactive} viewBox="0 0 24 24">
                        <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z"></path>
                    </svg>
                    {!hideLabels && <span>Notifications</span>}
                </div>

                
                {type !== 'company' && (
                    <>
                        <div className={styles.navItem}>
                            <svg onClick={() => navigate('/messaging')} fill={tab.tab === "messaging" ? '#1a1a1a' : '#666666'} xmlns="http://www.w3.org/2000/svg" className={styles.inactive} viewBox="0 0 24 24" data-supported-dps="24x24" width="24" height="24" focusable="false">
                                <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z"></path>
                            </svg>
                                {!hideLabels && <span>Messaging</span>}
                        </div>
                    </>
                )}

                {/* User Profile */}
                <div className={styles.navItem}>
                    <img 
                        src={defaultpfp} 
                        alt="Profile Icon" 
                        className={styles.icon}
                        onClick={() => navigate(`/profile/${type}/${id}`)} 
                    />
                    {!hideLabels && <span>Me</span>}
                </div>
                
                {/* Sign out */}
                <div className={styles.navItem} style={{ marginRight: '0' }}>
                    <svg onClick={() => handleLogout()} xmlns="http://www.w3.org/2000/svg" height="24px"  viewBox="0 -960 960 960" width="24px" className={styles.inactive} fill="#5f6368">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                    </svg>
                        {!hideLabels && <span>Sign out</span>}
                </div>
            </div>
        </nav> 
    );
}

export default Navbar;
