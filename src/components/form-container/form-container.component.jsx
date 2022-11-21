import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import Form from '../form/form.component';
import FormIcon from "../../images/contact-form.png"
// import Input from '../input/input.component';
// import CrudForm from '../crud-form/crudForm.component';

import BearerContext from '../../utilities/contexts/bearerContext/bearerContext';
import LogoutBtn from '../logout-btn/logoutBtn.component';

import "./form-container.styles.css";
// import FormForCrud from '../formForCrud/formForCrud.component';

const FormContainer = ({title, setSideMenus, sideMenus, DataForm, data, setValData, formTitle}) => {
    const navigate = useNavigate();
    const {bearer} = useContext(BearerContext)
    useEffect(() => {
        if(!bearer) {
            navigate("/login")
        }
    })

    const [showForm, toggleShowForm] = useState(false);

    return (
        <div className='form-container'>
            <div className="header">
                <h1 className='form-title'>{formTitle ? formTitle : `Create ${title}`}</h1>

                <LogoutBtn />
            </div>
            <button className='form-toggle-btn' type='button' onClick={() => toggleShowForm(!showForm)}><img alt='form-icon' className='form-icon' src={FormIcon}/> Create a Form</button>
            {
            showForm 
            ?
            // <Form>
            //         <Input inputName={params.title} setValue={setValue} value={value} required/>
            //         {elArr.map((el, i) => {
            //             return <React.Fragment key={i+1}>{el({i, setValue, value, deleteCrudForm})}</React.Fragment>
            //         })}
            //         {/* <button type='button' className='increase-inputs' onClick={() => incrsInputCount(inputCount+1)}>Add Another Input Field</button> */}
            //         <div className="btn-container">
            //             <button type='button' className='increase-inputs' onClick={() => addToElArr([...elArr, CrudForm])}>Add Another Input Field</button>
            //             <button type='submit' className='btn-submit' onClick={(e) => {sendData(e)}}>Submit</button>
            //         </div>
            // </Form>
            <DataForm title={title} setSideMenus={setSideMenus} sideMenus={sideMenus} data={data} setValData={setValData} type={formTitle}/>
            : 
            ""
            }
        </div>
    )
}

export default FormContainer