
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authQueries from '../queries/authQueries';

function Login() {
    //user credentials
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //company credentials
    const [companyName, setCompanyName] = useState('');
    const [companyPassword, setCompanyPassword] = useState('');

    const [err, setErr] = useState('');
    const [type, setType] = useState('user');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (type === 'user') {
                localStorage.setItem('type', 'user');
                const response = await authQueries.loginUser(username, password, type);
                const data = await response.json();
    
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('authorid', data.userid)
                    
                    const token = localStorage.getItem('token');
                    if (token) {
                        navigate('/');
                        setTimeout(() => {
                            window.location.reload();
                        }, 100); 
                    } else {
                        console.error('Token not found after login.');
                        setErr('Error: Token not found.');
                    }
                } else {
                    console.error('Login failed:', data);
                    setErr(data || 'Login failed');
                }
            } else if (type === 'company') {
                localStorage.setItem('type', 'company')
                const response = await authQueries.loginCompany(companyName, companyPassword, type);
                const data = await response.json();
    
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('authorid', data.userid);

                    const token = localStorage.getItem('token');
                    if (token) {
                        navigate('/');
                        setTimeout(() => {
                            window.location.reload();
                        }, 100); 
                    } else {
                        console.error('Token not found after login.');
                        setErr('Error: Token not found.');
                    }
                } else {
                    console.error('Login failed:', data);
                    setErr(data || 'Login failed');
                }
            }
        } catch (err) {
            console.error('Error during login:', err);
            setErr(err.message);
        }
    };

    const handleUserDemo = async () => {

        try {
            localStorage.setItem('type', 'user');
                const response = await authQueries.loginUser('Luca Tonello', '123', type);
                const data = await response.json();
    
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('authorid', data.userid)
                    
                    const token = localStorage.getItem('token');
                    if (token) {
                        navigate('/');
                        setTimeout(() => {
                            window.location.reload();
                        }, 100); 
                    } else {
                        console.error('Token not found after login.');
                        setErr('Error: Token not found.');
                    }
                } else {
                    console.error('Login failed:', data);
                    setErr(data || 'Login failed');
                }
        } catch (err) {
            console.error(err);
            setErr(err);
        }
    }

    const handleCompanyDemo = async () => {

        try {
            localStorage.setItem('type', 'company');
                const response = await authQueries.loginCompany('Tech solutions inc.', '123', type);
                const data = await response.json();
    
                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('authorid', data.userid)
                    
                    const token = localStorage.getItem('token');
                    if (token) {
                        navigate('/');
                        setTimeout(() => {
                            window.location.reload();
                        }, 100); 
                    } else {
                        console.error('Token not found after login.');
                        setErr('Error: Token not found.');
                    }
                } else {
                    console.error('Login failed:', data);
                    setErr(data || 'Login failed');
                }
        } catch (err) {
            console.error(err);
            setErr(err);
        }
    }
    const handleTypeChange = (e) => {
        const result = e.target.value;
        setType(result);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <legend className="legend">Login</legend>

                <select value={type} onChange={handleTypeChange} style={{ padding: '4px', borderRadius: '5px', border: '0.5px solid #dedede' }}>
                    <option value={'user'}>User</option>
                    <option value={'company'}>Company</option>
                </select>
                {type === 'user' ? (
                    //if its a user
                    <div>
                        <label htmlFor="username" className="label">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                            onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                        <label htmlFor="password" className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                        <button type="submit" className="button">Log in</button>
                        <button type="button" onClick={() => handleUserDemo()} className="button">Log into demo account</button>
                    </div>
                ) : (
                    //if its a company
                    <div>
                        <label htmlFor="companyName" className="label">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="input"
                            onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                        <label htmlFor="companyPassword" className="label">Company Password</label>
                        <input
                            type="password"
                            name="companyPassword"
                            value={companyPassword}
                            onChange={(e) => setCompanyPassword(e.target.value)}
                            className="input"
                            onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                        <button type="submit" className="button">Log in</button>
                        <button type="button" onClick={() => handleCompanyDemo()} className="button">Log into demo account</button>
                    </div>
                )}
                
                {err && <p className="errorMessage">{err.message}</p>}
            </form>
            <p className="paragraph">Don't have an account?</p>
            <Link
                to="/signup"
                className="link"
                onMouseOver={(e) => e.target.style.color = '#388E3C'}
                onMouseOut={(e) => e.target.style.color = '#f5a462'}
            >
                Signup
            </Link>
        </div>
    );
}

export default Login;