import React from 'react';
import "./form.styles.css";

const Form = ({children}) => {
    return(
        <form className='form'>
            {children}
        </form>
    )
}

export default Form;