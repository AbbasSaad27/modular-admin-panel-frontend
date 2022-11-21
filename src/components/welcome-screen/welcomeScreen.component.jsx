import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BearerContext from '../../utilities/contexts/bearerContext/bearerContext';

import LogoutBtn from '../logout-btn/logoutBtn.component';

import './welcomeScreen.styles.css';

const WelcomeScreen = () => {
    const {bearer, setBearer} = useContext(BearerContext) 
    const navigate = useNavigate();
    useEffect(() => {
        if(!bearer) {
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