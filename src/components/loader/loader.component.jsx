import React from 'react';
import "./loader.styles.css";

const Loader = () => {
    return (
        <div className="loader">
            <div className="bar bar-left"></div>
            <div className="bar bar-mid"></div>
            <div className="bar bar-right"></div>
        </div>
    )
}

export default Loader;