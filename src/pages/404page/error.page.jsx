import React from "react";
import { useNavigate } from "react-router-dom";

import "./error.styles.css";

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className="error-page">
            <div className="page-content">
                <h1>Error 404!</h1>
                <p>Not found or you don't have suffiecient permission!</p>

                <button className="btn-back" onClick={() => navigate("/")}>Back to Home</button>
            </div>
        </div>
    )
}

export default ErrorPage;