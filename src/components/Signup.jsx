
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  
import '../styles/Auth.css';
import authQueries from '../queries/authQueries';


function Signup() {
    const [type, setType] = useState('user')
    
    //for users
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [summary, setSummary] = useState('Hello World, this is my summary!');
    // const [pfp, setPfp] = useState(null);
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');

    //for companies
    const [companyName, setCompanyName] = useState('');
    const [companyPassword, setCompanyPassword] = useState('');
    const [companySummary, setCompanySummary] = useState('Hello World, this is my summary!');
    // const [companyLogo, setCompanyLogo] = useState(null);
    const [companyArea, setCompanyArea] = useState('');
    const [companyLocation, setCompanyLoaction] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');

    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        if (type === 'user') {
            formData.append('username', username);
            formData.append('password', password);
            formData.append('summary', summary);
            formData.append('location', location);
            formData.append('website', website);
            // formData.append('pfp', pfp);
        } else if (type === 'company') {
            formData.append('name', companyName);
            formData.append('password', companyPassword);
            // formData.append('logo', companyLogo);
            formData.append('area', companyArea);
            formData.append('location', companyLocation);
            formData.append('summary', companySummary);
            formData.append('website', companyWebsite);
        } else {
            throw new Error('Type not recognized');
        }

        formData.append('type', type);
      
        try {
            //log the user/company in
            const response = await authQueries.signup(formData)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to sign up');

            }
            navigate('/login');
        } catch (err) {
            console.error('Error during signup', err);
            setErr(err.message);
        }
    }

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];

    //     if (type === 'user') {
    //         setPfp(file);
    //     } else if (type === 'company') {
    //         setCompanyLogo(file);
    //     } else {
    //         throw new Error('Type not recognized')
    //     }
    // };

    const handleTypeChange = (e) => {
        const result = e.target.value
        setType(result);
    }

    return (
        <div className="container">
        <form onSubmit={handleSubmit} className="form">
            <legend className="legend">Signup</legend>
            <select value={type} onChange={handleTypeChange} >
                <option value={'user'}>User</option>
                <option value={'company'}>Company</option>
            </select>
            {type == 'user' ? (
                //if its a user, show this form
                <div>
                    <label htmlFor="username" className="label">* Username</label>
                    <input
                        type="text" 
                        name="username"
                        value={username}
                        maxLength={15}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <label htmlFor="password" className="label">* Password</label>
                    <input
                        type="password" 
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <label htmlFor="summary" className="label">Summary</label>
                    <input
                        type="text" 
                        name="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="input"
                        onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <label htmlFor="website" className="label">Website</label>
                    <input 
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="input"
                        onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <label htmlFor="location" className="label">Location</label>
                    <input 
                        type="text"
                        name="location"
                        value={location}
                        className="input"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <div className="file-upload-container">
                        <label htmlFor="fileUpload" className="file-upload-btn">
                            Upload Profile Picture
                        </label>
                        {/* <input
                            type="file"
                            name="pfp"
                            id="fileUpload"
                            onChange={handleFileChange}
                            accept=".png, .jpg, .jpeg"
                        /> */}
                        </div>
                        <button type="submit" className="button">Sign up</button>

                </div>
            ) : (
                //if its a company, show this form instead
                <div>
                    <label htmlFor="companyName" className="label">* Company Name</label>
                    <input
                        type="text" 
                        name="companyName"
                        value={companyName}
                        maxLength={30}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="input"
                        onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <label htmlFor="companyPassword" className="label">* Company Password</label>
                    <input
                        type="password" 
                        name="companyPassword"
                        value={companyPassword}
                        onChange={(e) => setCompanyPassword(e.target.value)}
                        className="input"
                        onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <label htmlFor="companySummary" className="label">Company Summary</label>
                    <input
                        type="text" 
                        name="companySummary"
                        value={companySummary}
                        onChange={(e) => setCompanySummary(e.target.value)}
                        className="input"
                        onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <label htmlFor="companyWebsite" className="label">Company Website</label>
                    <input 
                        type="text"
                        name="companyWebsite"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        className="input"
                        onFocus={(e) => e.target.style.borderColor = '#f5a462'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                    <label htmlFor="companyArea" className="label">Company Area</label>
                    <input 
                        type="text"
                        name="companyArea"
                        value={companyArea}
                        onChange={(e) => setCompanyArea(e.target.value)}
                        className="input"
                    />
                    <label htmlFor="companyLocation" className="label">Company Location</label>
                    <input 
                        type="text"
                        name="companyLocation"
                        value={companyLocation}
                        onChange={(e) => setCompanyLoaction(e.target.value)}
                        className="input"
                    />
                    <div className="file-upload-container">
                        <label htmlFor="fileUpload" className="file-upload-btn">
                            Upload logo
                        </label>
                        {/* <input
                            type="file"
                            name="companyLogo"
                            id="fileUpload"
                            onChange={handleFileChange}
                            accept=".png, .jpg, .jpeg"
                        /> */}
                    </div>
                    <button type="submit" className="button">Sign up</button>
                </div>
            )}
        </form>
        <p className="paragraph">Already have an account?</p>
        <Link 
            to="/login" 
            className="link"
            onMouseOver={(e) => e.target.style.color = '#388E3C'}
            onMouseOut={(e) => e.target.style.color = '#f5a462'}
        >
            Login
        </Link>
        {err && <p className="errorMessage">{err}</p>}  
    </div>    
    );
}

export default Signup;
