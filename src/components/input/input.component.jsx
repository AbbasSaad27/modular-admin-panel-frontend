import React from 'react';
import "./input.styles.css";

const Input = ({inputName, label, placeholder, name, required, indx, setValue, value, changeData, type, inpValue, classname}) => {
    const inputNameMod = inputName && `${inputName[0].toLowerCase()}${inputName.substring(1)}`.split(" ").join("");
    const changeValue = function(e) {
        if(!inputNameMod){
            const newArr = [...value.inputFields];
            const val = type === "checkbox" ? e.target.checked : e.target.value
            newArr[indx] ? newArr[indx][name] = val : newArr[indx] = {[name]: val};
            setValue({
                ...value,
                inputFields:  [...newArr]
            })
            return;
        }

        setValue({
            ...value,
            [inputNameMod]: type === "checkbox" ? e.target.checked : e.target.value,
            inputFields: [...value.inputFields]
        })
    }
    return (
        <div className={`form-input-group ${classname ? classname : ""}`}>
            <label className='label' htmlFor={name ? name : inputNameMod}>{label ? label : inputName}:</label>
            <input className="input" value={inpValue} type={type ? type : "text"} placeholder={placeholder} name={name ? name : inputNameMod} id={name ? name : inputNameMod} required={required ? true : false} onChange={(e) => {changeData ? changeData(e) : changeValue(e)}}/>
        </div>
    )
}

export default Input;