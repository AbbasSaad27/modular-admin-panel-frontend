import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./sidebar.styles.css";

const SideBar = ({sideMenus, perm}) => {
    const navigate = useNavigate();
    return(
        <div className='side-bar scrollbar'>
            <h1 className='side-bar--title'>LIST OF CRUDS</h1>
            <ul className='crud-list'>
                {/* <li className='crud-list-item'><Link to="/">Hello World</Link></li> */}
                {sideMenus.map((menu, i) => {
                    return (
                        <li className='crud-list-item' key={i+1}>
                            <Link to={`/crudItem/${menu}`} className='menu-link'>{menu}</Link>
                            {perm ?  <Link className='menu-link edit-link' to={`/crudItem/edit/${menu}`}>Edit</Link> : ""}
                        </li>
                    )
                })}
            </ul>
            <button className='btn-home' onClick={() => navigate("/")}>Back to home</button>
        </div>
    )
}

export default SideBar;