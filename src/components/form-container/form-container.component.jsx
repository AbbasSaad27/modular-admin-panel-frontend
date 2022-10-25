import React, { useState } from 'react';
// import axios from 'axios';

// import Form from '../form/form.component';
import FormIcon from "../../images/contact-form.png"
// import Input from '../input/input.component';
// import CrudForm from '../crud-form/crudForm.component';

import "./form-container.styles.css";
// import FormForCrud from '../formForCrud/formForCrud.component';

const FormContainer = ({title, setSideMenus, sideMenus, DataForm, data, setValData}) => {
    const [showForm, toggleShowForm] = useState(false);
    // const [inputCount, incrsInputCount] = useState(1);
    // const mtArray = Array(inputCount).fill("el")
    // const [value, setValue] = useState({inputFields: []})
    // const [elArr, addToElArr] = useState([CrudForm])

    // const deleteCrudForm = (e) => {
    //     const indx = Number(e.target.parentElement.parentElement.dataset.indx)
    //     const newElArr = elArr.filter((_, i) => indx !== i);
    //     const newValue = value.inputFields.filter((_, i) => indx !== i);

    //     addToElArr([...newElArr]);
    //     setValue({
    //         ...value,
    //         inputFields: [...newValue]
    //     });
    // }

    // const sendData = (e) => {
    //     e.preventDefault();
    //     // axios({
    //     //     method: "post",
    //     //     url: "https://modular-ap.herokuapp.com/api/crud",
    //     //     data: {...value}
    //     // })
    //     fetch("https://modular-ap.herokuapp.com/api/crud", {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }, 
    //         body: JSON.stringify(value)
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    // }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Create {title}</h1>
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
            <DataForm title={title} setSideMenus={setSideMenus} sideMenus={sideMenus} data={data} setValData={setValData}/>
            : 
            ""
            }
        </div>
    )
}

export default FormContainer