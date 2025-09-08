import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [resumes, setResumes] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_API_URL}/resumes`, {
            headers: { Authorization: token }
        }).then(res => setResumes(res.data))
          .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Your Resumes</h1>
            <Link to="/resume-builder">Create New Resume</Link>
            <ul>
                {resumes.map(r => (
                    <li key={r._id}>
                        {r.personalInfo.name} - Level {r.level}
                    </li>
                ))}
            </ul>
        </div>
    );
}
