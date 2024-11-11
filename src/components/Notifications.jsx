import { useState, useEffect } from "react";
import memberQueries from '../queries/memberQueries'
import Navbar from "./Navbar";

function Notifications() {
    const [connectionReqs, setConnectionReqs] = useState([]);

    const userid = localStorage.getItem('authorid');

    useEffect(() => {
        const getRequests = async () => {
            const response = await memberQueries.getRequests(userid);
            const data = await response.json();
            console.log('reqests: ', data);
            setConnectionReqs(data);
        }
        getRequests();
    }, [userid]);

    return (
        <>
            <Navbar />
            {connectionReqs.map(request => (
                <h1 key={request.id}>{request.username}</h1>
            ))}

        </>
    )
}   

export default Notifications;