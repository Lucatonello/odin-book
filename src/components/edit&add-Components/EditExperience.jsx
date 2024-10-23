import { useState } from "react";
import PropTypes from 'prop-types';
import memberQueries from "../../queries/memberQueries";
import styles from '../../styles/EditProfile.module.css'

function EditExperience({ onHide, userId, experienceDetails }) {
    console.log(experienceDetails);

    const [title, setTitle] = useState(experienceDetails.title);
    const [employmentType, setEmploymentType] = useState(experienceDetails.employmenttype);
    const [companyName, setCompanyName] = useState(experienceDetails.companyname);
    const [location, setLocation] = useState(experienceDetails.location.length > 0 ? experienceDetails.location : '');
    const [startMonth, setStartMonth] = useState(experienceDetails.startmonth);
    const [startYear, setStartYear] = useState(experienceDetails.startyear);
    const [endMonth, setEndMonth] = useState(experienceDetails.endmonth);
    const [endYear, setEndYear] = useState(experienceDetails.endyear);
    const [isActive, setIsActive] = useState(experienceDetails.isactive === true ? experienceDetails.isActive : 'false');
    const [description, setDescription] = useState(experienceDetails.description !== ' ' ? experienceDetails.description : '');

    const currentYear = new Date().getFullYear();
    const startingYear = 1924;

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        await memberQueries.editExperience(userId, filteredData);
    }

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
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h1 style={{ margin: '0' }}>Edit experience</h1>
                    <svg className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend>Title*</legend>
                    <input 
                        type="text" 
                        value={title}
                        defaultValue={experienceDetails.title}
                        placeholder="Ex: Backend Developer"
                        className={styles.input}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <legend>Employment type</legend>
                    <select className={styles.input} style={{ width: '92.3%' }} value={employmentType} onChange={handleTypeChange}>
                        <option value=" " disabled>Please select</option>
                        <option value="fullTime">Full-time</option>
                        <option value="partTime">part-time</option>
                        <option value="selfEmployed">Self-employed</option>
                        <option value="freelance">Freelance</option>
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
                        required
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
                        <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={startMonth} onChange={handleStartMonthChange} required>
                            <option value=" ">Month</option>
                            <option value="Jan">January</option>
                            <option value="Feb">February</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
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
                        placeholder="List your major duties and successes, highlighting specific projects"
                        onChange={(e) => setDescription(e.target.value)}
                    />     
                    <hr />
                
                    <div className={styles.bottom}>
                        <button className={styles.save} type="submit">Save</button>
                    </div>               
                </form>

                <hr />
            </div>
        </div>
    );
}

EditExperience.propTypes = {
    onHide: PropTypes.func.isRequired, 
    userId: PropTypes.isRequired,
    experienceDetails: PropTypes.isRequired, 
};

export default EditExperience;