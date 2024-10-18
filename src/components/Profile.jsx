import { useState, useEffect } from 'react';
import memberQueries from '../queries/memberQueries';

function Profile() {
    const [memberData, setMemberData] = useState('');

    const type = localStorage.getItem('type');
    const id = localStorage.getItem('authorid');

    useEffect(() => {
        const getMemberData = async () => {
            if (type == 'user') {
                const response = await memberQueries.getUserData(type, id);
                const data = await response.json();
                setMemberData(data);
                console.log(data)
            } else if (type == 'company') {
                const response = await memberQueries.getCompanyData(type, id);
                const data = await response.json();
                setMemberData(data);
                console.log(data)
            }
        } 
        getMemberData();
    }, [id, type])

    return (
        <div>
            <h1>{type == 'user' ? memberData.username : memberData.name}</h1>
        </div>
    );
} 

export default Profile;
