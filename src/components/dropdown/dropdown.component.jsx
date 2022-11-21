import React from "react";
import "./dropdown.styles.css";

const DropDown = ({name, placeholder, label, opt = [], docs, changeVal, prop, multiple, dataId}) => {
    const options = [placeholder].concat(opt[0] ? opt : docs)
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <select data-id={dataId ? dataId : ""} className="dropdown scrollbar" placeholder={placeholder} name={name} onChange={(e) => {changeVal && changeVal(e)}} multiple>
                {options.map((txt, i) => {
                    const isFirst = i === 0;
                    if(typeof txt === "string") return(
                                        <option defaultValue={isFirst} hidden={isFirst} key={i+1} value={txt}>{txt}</option>
                                    )
                    const nameProp = Object.keys(txt).filter((key) => key.toLowerCase().includes("name"))[0];
                    let val;
                    if(txt[prop]) {
                        val = txt[prop]
                    } else {
                        val = txt[nameProp]
                    }
                    return(
                        <option key={i+1} value={txt._id}>{val}</option>
                    )
                })}
            </select>
        </>
    )
}

export default DropDown;