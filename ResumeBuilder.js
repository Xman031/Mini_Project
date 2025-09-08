import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResumeBuilder() {
    const navigate = useNavigate();
    const [resume, setResume] = useState({
        level: 1,
        personalInfo: { name: '', email: '', phone: '', address: '', objective: '' },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certifications: [],
        socialLinks: {}
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post(`${process.env.REACT_APP_API_URL}/resumes`, resume, {
            headers: { Authorization: token }
        });
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Full Name" onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, name: e.target.value } })} required />
            <input placeholder="Email" onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, email: e.target.value } })} required />
            <input placeholder="Phone" onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, phone: e.target.value } })} required />
            <input placeholder="Objective" onChange={e => setResume({ ...resume, personalInfo: { ...resume.personalInfo, objective: e.target.value } })} />

            <label>Resume Level (1 / 2 / 3)</label>
            <input type="number" min="1" max="3" onChange={e => setResume({ ...resume, level: parseInt(e.target.value) })} />

            <button type="submit">Save Resume</button>
        </form>
    );
}
