import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BearerContext from '../../utilities/contexts/bearerContext/bearerContext';
import './logoutBtn.styles.css'

const LogoutBtn = () => {

    const {setBearer} = useContext(BearerContext)

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        setBearer(null)
        navigate("/login")
    }

    return (
        <button type='button' className='btn-logout' onClick={(e) => logout()}>Log Out</button>
    )
}


export default LogoutBtn;