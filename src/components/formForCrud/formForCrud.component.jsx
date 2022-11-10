import React, {useState} from "react";

import Form from "../form/form.component";
import Input from "../input/input.component";
import CrudForm from "../crud-form/crudForm.component";
import Loader from "../loader/loader.component";

import BearerContext from "../../utilities/contexts/bearerContext/bearerContext";
import { useContext } from "react";

const FormForCrud = ({title, setSideMenus, sideMenus}) => {
    const [value, setValue] = useState({showInTheMenu: false, inputFields: []});
    const [elArr, addToElArr] = useState([CrudForm]);
    const [loader, setLoader] = useState(false);
    const {bearer} = useContext(BearerContext)

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
        // axios({
        //     method: "post",
        //     url: "https://modular-ap.herokuapp.com/api/crud",
        //     data: {...value}
        // })
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
            console.log(data, value);
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
                <Input inputName={title} setValue={setValue} value={value} required/>
                <Input label="Show In The Menu" type="checkbox" value={value}  setValue={setValue} inputName="showInTheMenu" classname="checkbox-input-container"/>
                {elArr.map((el, i) => {
                    return <React.Fragment key={i+1}>{el({i, setValue, value, deleteCrudForm})}</React.Fragment>
                })}
                <div className="btn-container">
                    <button type='button' className='increase-inputs' onClick={() => addToElArr([...elArr, CrudForm])}>Add Another Input Field</button>
                    <button type='submit' className='btn-submit' onClick={(e) => {sendData(e)}}>Submit</button>
                </div>
            </Form>
    )
}

export default FormForCrud;