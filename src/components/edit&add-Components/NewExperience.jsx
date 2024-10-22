import { useState } from "react";
import PropTypes from 'prop-types';
import memberQueries from "../../queries/memberQueries";
import styles from '../../styles/EditProfile.module.css'

function NewExperience({ onHide, userId }) {
    const [title, setTitle] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [startMonth, setStartMonth] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [endMonth, setEndMonth] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [description, setDescription] = useState('');

    const currentYear = new Date().getFullYear();
    const startingYear = 1924;

    const handleSubmit = async () => {
        let data = {
            title,
            employmentType,
            companyName,
            location,
            startMonth,
            startYear,
            endMonth,
            endYear,
            isActive,
            description
        }
        const filteredData = Object.fromEntries(
            // eslint-disable-next-line no-unused-vars
            Object.entries(data).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
        );
        await memberQueries.newExperience(userId, filteredData);
    }

    //separate functions to handle the event of dropdowns to ensure the state updates properly when the server is slow
    const handleTypeChange = (e) => {
        const newType = e.target.value;
        setEmploymentType(newType);
    };
    const handleActiveChange = (e) => {
        const status = e.target.value;
        setIsActive(status);
    };
    const handleStartMonthChange = (e) => {
        const month = e.target.value;
        setStartMonth(month);
    };
    const handleStartYearChange = (e) => {
        const year = e.target.value;
        setStartYear(year);
    };
    const handleEndMonthChange = (e) => {
        const month = e.target.value;
        setEndMonth(month)
    };
    const handleEndYearChange = (e) => {
        const year = e.target.value;
        setEndYear(year)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h1 style={{ paddingTop: '10px', margin: '0px' }}>Add experience</h1>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend>Title*</legend>
                    <input 
                        type="text" 
                        value={title}
                        placeholder="Ex: Backend Developer"
                        className={styles.input}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <legend>Employment type</legend>
                    <select className={styles.input} style={{ width: '92.3%' }} value={employmentType} onChange={handleTypeChange}>
                        <option value="Please select" disabled>Please select</option>
                        <option value="fullTime">Full-time</option>
                        <option value="partTime">part-time</option>
                        <option value="selfEmployed">Self-employed</option>
                        <option value="freelance">Freelancetime</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="apprenticeship">Apprenticeship</option>
                        <option value="seasonal">Seasonal</option>
                    </select>

                    <legend>Company name*</legend>
                    <input 
                        type="text" 
                        value={companyName}
                        placeholder="Ex: Microsoft"
                        className={styles.input}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <legend>Location</legend>
                    <input
                        type="text"
                        value={location}
                        placeholder="Ex: London, United Kingdom"
                        className={styles.input}
                        onChange={(e) => setLocation(e.target.value)} 
                    />
                    <div style={{ display: 'flex' }}>
                        <select className={styles.input} style={{ width: '70px', marginRight: '10px' }} value={isActive} onChange={handleActiveChange}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                        <p>I am currently working in this role</p>
                    </div>

                    <legend>Start date*</legend>
                    <div style={{ display: 'flex' }}>
                        <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={startMonth} onChange={handleStartMonthChange}>
                            <option value="">Month</option>
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="august">August</option>
                            <option value="september">September</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>
                        </select>
                    
                        <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={startYear} onChange={handleStartYearChange}>
                            <option value="">Year</option>
                            {Array.from({ length: currentYear - startingYear + 1 }, (v, i) => startingYear + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    {isActive == 'false' && (
                        <>
                            <legend>End date*</legend>
                            <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={endMonth} onChange={handleEndMonthChange}>
                                <option value="">Month</option>
                                <option value="january">January</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                <option value="april">April</option>
                                <option value="may">May</option>
                                <option value="june">June</option>
                                <option value="july">July</option>
                                <option value="august">August</option>
                                <option value="september">September</option>
                                <option value="october">October</option>
                                <option value="november">November</option>
                                <option value="december">December</option>
                            </select>

                            <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={endYear} onChange={handleEndYearChange}>
                                <option value="">Year</option>
                                {Array.from({ length: currentYear - startingYear + 1 }, (v, i) => startingYear + i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </>
                    )}
                    <legend>Description</legend>
                    <textarea 
                        value={description}
                        className={styles.input}
                        onChange={(e) => setDescription(e.target.value)}
                    />                    
                </form>
                
                <hr />
                
                <div className={styles.bottom}>
                    <button className={styles.save} style={{ }} type="submit">Save</button>
                </div>
            </div>
        </div>
    );
}
NewExperience.propTypes = {
    onHide: PropTypes.func.isRequired, 
    userId: PropTypes.string.isRequired, 
};

export default NewExperience;