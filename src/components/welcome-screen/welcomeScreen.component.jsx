import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoutBtn from '../logout-btn/logoutBtn.component';

import './welcomeScreen.styles.css';

const WelcomeScreen = ({token, setBearer}) => {
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
            <LogoutBtn setBearer={setBearer}/>
        </div>
    )
}

export default WelcomeScreen;