import { useState } from "react";
import PropTypes from 'prop-types';
import memberQueries from "../../queries/memberQueries";
import styles from '../../styles/EditProfile.module.css'

function NewEducation({ onHide, userId }) {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [startMonth, setStartMonth] = useState('');
    const [startYear, setStartYear] = useState(null);
    const [endMonth, setEndMonth] = useState('');
    const [endYear, setEndYear] = useState(null);
    const [description, setDescription] = useState('');

    const currentYear = new Date().getFullYear();
    const startingYear = 1924;
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = {
            school,
            degree,
            startMonth,
            startYear,
            endMonth,
            endYear,
            description
        };

        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
        );
        const response = await memberQueries.newEducation(userId, filteredData);
        const result = await response.json();

        if (result.isDone) {
            window.location.reload();
        }
    }
     //separate functions to handle the event of dropdowns to ensure the state updates properly when the server is slow
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
                    <h1 style={{ margin: '0px' }}>Add education</h1>
                    <svg className={styles.close} onClick={onHide} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <legend>School*</legend>
                    <input 
                        type="text"
                        value={school}
                        className={styles.input}
                        placeholder="Ex: Boston University"
                        onChange={(e) => setSchool(e.target.value)}
                        required
                    />

                    <legend>Degree</legend>
                    <input 
                        type="text"
                        value={degree}
                        className={styles.input}
                        placeholder="Ex: Bachelor's in Computer Science"
                        onChange={(e) => setDegree(e.target.value)}
                        required 
                    />

                    <legend>Start date</legend>
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
                    <div style={{ display: 'felx' }}>
                        <legend>End date (or expected)</legend>
                            <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={endMonth} onChange={handleEndMonthChange}>
                                    <option value="">Month</option>
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

                        <select className={styles.input} style={{ width: '45.5%', marginRight: '10px' }} value={endYear} onChange={handleEndYearChange}>
                            <option value="">Year</option>
                            {Array.from({ length: currentYear + 10 - startingYear + 1 }, (v, i) => startingYear + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <legend>Description</legend>
                    <textarea 
                        value={description}
                        className={styles.input}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <hr />

                    <div className={styles.bottom}>
                            <button className={styles.save} type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

NewEducation.PropTypes = {
    onHide: PropTypes.func.isRequired,
    userId: PropTypes.isRequired
};

export default NewEducation;