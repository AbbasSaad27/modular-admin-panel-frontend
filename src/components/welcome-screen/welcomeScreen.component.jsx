import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcomeScreen.styles.css';

const WelcomeScreen = ({token}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!token) {
            navigate("/login")
            return;
        }
    })

    return (
        <div className="welcome-screen">
            <h1 className="welcome-message">Welcome!</h1>
        </div>
    )
}

export default WelcomeScreen;