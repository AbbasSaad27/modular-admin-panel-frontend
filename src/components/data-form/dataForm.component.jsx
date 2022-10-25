import React, {useState} from "react";

import Form from "../form/form.component";
import Input from "../input/input.component";
import "./dataForm.styles.css";

const DataForm = ({data: {crudName, inputFields}, setValData}) => {
    const initObj = {}
    inputFields.forEach((inpObj) => {
        initObj[inpObj["name"]] = "";
    })
    const [inputVals, setInputVals] = useState(initObj)

    const changeData = (e) => {
        const newInputVals = {
            ...inputVals,
            [e.target.name]: e.target.value
        }

        setInputVals({...newInputVals})
    }

    const sendData = async(e) => {
        e.preventDefault()
        const dataPopulated = inputFields.every((obj) => {
            if(inputVals[obj["name"]]) return true;
            else return false;
        })
        if(!dataPopulated) {
            alert("please fill up the full form");
            return;
        }
        const res = await fetch(`https://modular-ap.herokuapp.com/api/data/${crudName.toLowerCase()}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputVals)
        })
        
        const dataRes = await fetch(`https://modular-ap.herokuapp.com/api/data/${crudName.toLowerCase()}`)
        const data = await dataRes.json();

        setValData(data.data);
    }
    return(
        <Form>
            {inputFields.map((obj, i) => {
                return (
                    <Input key={i+1} {...obj} changeData={changeData} required inpValue={inputVals[obj.name]}/>
                )
            })}
            <button type='submit' className='btn-submit data-submit' onClick={(e) => {sendData(e)}}>Submit</button>
        </Form>
    )
}
export default DataForm;