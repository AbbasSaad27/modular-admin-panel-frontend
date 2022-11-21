import React, {useState} from "react";

import Form from "../form/form.component";
import Input from "../input/input.component";
import CrudForm from "../crud-form/crudForm.component";
import Loader from "../loader/loader.component";

import BearerContext from "../../utilities/contexts/bearerContext/bearerContext";
import { useContext } from "react";
import { useEffect } from "react";

const FormForCrud = ({title, setSideMenus, sideMenus, type}) => {
    const ifEdit = type?.includes("Edit");
    const crudName = ifEdit ? type.split(" ").slice(1).join('') : ""
    const initObj = ifEdit ? {inputFields: []} : {showInTheMenu: false, inputFields: []}
    const [value, setValue] = useState(initObj);
    const [elArr, addToElArr] = useState([CrudForm]);
    const [loader, setLoader] = useState(false);
    const [crudId, setCrudId] = useState(null);
    const {bearer} = useContext(BearerContext)

    useEffect(() => {
        if(ifEdit) {
            fetch(`https://modular-ap.herokuapp.com/api/crud/${crudName}`)
            .then(res => res.json())
            .then(data => setCrudId(data._id))
        }
    })

    const deleteCrudForm = (e) => {
        const indx = Number(e.target.parentElement.parentElement.dataset.indx)
        const newElArr = elArr.filter((_, i) => indx !== i);
        const newValue = value.inputFields.filter((_, i) => indx !== i);

        addToElArr([...newElArr]);
        setValue({
            ...value,
            inputFields: [...newValue]
        });
    }

    const sendData = (e) => {
        setLoader(true);
        e.preventDefault();
        
        if(ifEdit) {
            fetch(`https://modular-ap.herokuapp.com/api/crud/${crudName}/${crudId}`, {
                method: "PATCH",
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${bearer}`
                },
                body: JSON.stringify(value.inputFields[0])
            })
            .then(res => res.json())
            .then(data => setLoader(false))
            return;
        }
        const newInputFields = value.inputFields.map((obj) => {
            return obj;
        })
        fetch("https://modular-ap.herokuapp.com/api/crud", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${bearer}`
            }, 
            body: JSON.stringify({...value, inputFields: [ ...newInputFields]})
        })
        .then(res => res.json())
        .then(data =>{ 
            if(data.status !== "error" || data.status !== "fail") {
                setSideMenus([...sideMenus, value.crudName]);
                setValue({});
                addToElArr([CrudForm]);
            }
            setLoader(false)
        })
    }
    return ( 
        loader 
        ? 
            <Loader />
        :   <Form>
                {
                    ifEdit
                    ? "" 
                    : 
                    <>           
                        <Input inputName={title} setValue={setValue} value={value} required/>
                        <Input label="Show In The Menu" type="checkbox" value={value}  setValue={setValue} inputName="showInTheMenu" classname="checkbox-input-container"/>    
                    </>
                }
                {elArr.map((el, i) => {
                    return <React.Fragment key={i+1}>{el({i, setValue, value, deleteCrudForm})}</React.Fragment>
                })}
                <div className="btn-container">
                    {ifEdit ? "" : <button type='button' className='increase-inputs' onClick={() => addToElArr([...elArr, CrudForm])}>Add Another Input Field</button>} 
                    <button type='submit' className='btn-submit' onClick={(e) => {sendData(e)}}>Submit</button>
                </div>
            </Form>
    )
}

export default FormForCrud;