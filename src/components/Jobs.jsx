import { useState, useEffect } from "react";
import jobsQueries from '../queries/jobsQueries';
import Navbar from './Navbar';

function Jobs() {

    useEffect(() => {
        const getJobsData = async () => {
            const result = await jobsQueries.getAllJobs;
        }
    })

    return (
        <>
            <Navbar />
            
        </>
    )
}

export default Jobs;