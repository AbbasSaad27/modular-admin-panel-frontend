import React from 'react';
import "./input.styles.css";

const Input = ({inputName, label, placeHolder, name, required, indx, setValue, value, changeData, type, inpValue, classname}) => {
    const inputNameMod = inputName && `${inputName[0].toLowerCase()}${inputName.substring(1)}`.split(" ").join("");
    const changeValue = function(e) {
        if(!inputNameMod){
            const newArr = [...value.inputFields];
            newArr[indx] ? newArr[indx][name] = e.target.value : newArr[indx] = {[name]: e.target.value};
            setValue({
                ...value,
                inputFields:  [...newArr]
            })
            return;
        }

        setValue({
            [inputNameMod]: e.target.value,
            inputFields: [...value.inputFields]
        })
    }
    return (
        <div className={`form-input-group ${classname ? classname : ""}`}>
            <label className='label' htmlFor={name ? name : inputNameMod}>{label ? label : inputName}:</label>
            <input className="input" value={inpValue} type={type ? type : "text"} name={name ? name : inputNameMod} id={name ? name : inputNameMod} required={required ? true : false} onChange={(e) => {changeData ? changeData(e) : changeValue(e)}}/>
        </div>
    )
}

export default Input;