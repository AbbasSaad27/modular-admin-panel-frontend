import React, {useState} from "react";
import { useContext } from "react";
import { useEffect } from "react";
import UserContext from "../../utilities/contexts/userContexts/userContext";
import DropDown from "../dropdown/dropdown.component";
import "./data-table.styles.css";

const DataTable = ({crudItem, setParentData, parentData = [], bearer}) => {
    const [editState, setEditState] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [data, setData] = useState(parentData)
    const [roles, setRoles] = useState([]);
    const [perms, setPermissions] = useState([])
    const [docRefs, setDocRefs] = useState([])
    const crudItems = useContext(UserContext)

    useEffect(() => {
        if(parentData[0]) {
            setEditState(parentData.map(() => "Edit"))
            setDisabled(parentData.map(obj => { return {id: obj._id, state: true}}))
            setData(parentData)
        }
        if(crudItem === "roles") {
            fetch("https://modular-ap.herokuapp.com/api/data/permissions", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${bearer}`
                }
            })
            .then(res => res.json())
            .then(data => setPermissions([...data.data]))
        }
        if(crudItem === "users") {
            fetch("https://modular-ap.herokuapp.com/api/data/roles", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${bearer}`
                }
            })
            .then(res => res.json())
            .then(data => setRoles([...data.data]))
        }

    }, [parentData])

    const deleteData = function(e) {
        const id = e.target.dataset.id
        const newData = data.filter((obj) => obj._id !== id)

        fetch(`https://modular-ap.herokuapp.com/api/data/${crudItem}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${bearer}`
            }
        })
        .then(res => res.json())
        .then(data => {setData(newData)})
    }

    const startEdit = function(e) {
        const id = e.target.dataset.id
        const indx = e.target.dataset.indx
        disabled[indx]["state"] = !disabled[indx]["state"]
        console.log(editState, disabled)
        setDisabled([...disabled])
        if(editState[indx] === "Edit") {
            editState[indx] = "Save"
            setEditState([...editState]);
        } else {
            editState[indx] = "Edit"
            setEditState([...editState])
            const dataObj = {...data.find((obj) => obj._id === id)}

            delete dataObj._id;
            fetch(`https://modular-ap.herokuapp.com/api/data/${crudItem}/${id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${bearer}`
                },
                body: JSON.stringify(dataObj)
            })
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }

    const resetEdit = function(e) {
        const indx = e.target.dataset.indx
        disabled[indx]["state"] = true
        editState[indx] = "Edit";

        setDisabled([...disabled]);
        setEditState([...editState])
    }

    const handleChange = function(e) {
        const id = e.target.dataset.id
        const {name, value} = e.target;
        const newDataArr = data.map((obj) => {
            if(obj._id === id) {
                obj[name] = value
                console.log("henlo")
                console.log(obj)
            }

            return obj;
        })
        setData(newDataArr)
    }

    const dropdownChange = function(e) {
        const {target} = e
        const {value, name, options, selectedIndex, dataset: {id}} = target
        console.log(id)
        const selectedVal = value;
        const newDataArr = data.map(obj => {
            if(obj._id === id) {
                console.log(name)
                if(name === "permissions") {
                    const val = [];
                    [...options].forEach(opt => {
                        if(opt.selected) {
                            val.push(opt.value)
                        }
                    })

                    obj[name] = val
                    console.log(obj)
                    return obj
                }
                if(name === "role") {
                    obj[name] = options[selectedIndex].text
                    return obj
                }
                obj[name] = selectedVal
            }

            return obj;

        })

        setData(newDataArr)
        if(name.includes("collection")) {
            fetch(`https://modular-ap.herokuapp.com/api/data/${selectedVal.toLowerCase()}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${bearer}`
                }
            })
            .then(rest => rest.json())
            .then(data => setDocRefs(data.data))
            .catch(err => console.log(err))
        }
    }
    
    return (
        data[0] ? 
        <table className="data-table">
            <thead>
                <tr>
                    {Object.keys(data[0]).map((title, i) => {
                        if(title === "__v") return ""
                        return(
                            <th key={i+1}>{i === 0 ? "No." : title}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((obj, indx) => {
                    return(
                        <tr key={obj._id}>
                            {
                                Object.values(obj).map((value, i) => {
                                    let formattedValue;
                                    let propName = Object.keys(obj)[i]
                                    if(typeof value === "object" && value !== null) formattedValue = value.join(", ");
                                    else formattedValue = value;
                                    if(value === null) formattedValue = "All Docs";
                                    if(obj["__v"] === value) return ""
                                    if(value === true || value === false) formattedValue = value;
                                    if(editState[indx] === "Save") {
                                        if(propName === "permissions" && perms[0]) return <td key={i+1}>
                                                <DropDown dataId={obj._id} name={propName} opt={perms} prop="title" multiple placeholder="Update Permissions" changeVal={dropdownChange}/>
                                            </td>
                                        if(propName === "role" && roles[0]) return <td key={i+1}>
                                                <DropDown dataId={obj._id} name={propName} opt={roles} prop="title" placeholder="Update Permissions" changeVal={dropdownChange}/>
                                            </td>
                                        if(propName === "collectionName" ) return <td key={i+1}>
                                                <DropDown dataId={obj._id} name={propName} opt={crudItems} prop="title" placeholder="Update Permissions" changeVal={dropdownChange}/>
                                            </td>
                                        if(propName === "docRef") return <td key={i+1}>
                                        <DropDown dataId={obj._id} name={propName} docs={docRefs[0] ? docRefs : []} prop="title" placeholder="Update Permissions" changeVal={dropdownChange}/>
                                    </td>
                                    }
                                    return <td key={i+1}>{i === 0 ? (indx+1) : <input data-id={obj._id} type="text" name={propName} value={formattedValue} disabled={disabled[indx]?.state ? true : false} className="edit-input scrollbar" onChange={(e) => handleChange(e)}/>}</td>
                                })
                            }           
                            <td className="last-row">
                                <button className="btn-data-del" data-id={obj._id} onClick={(e) => deleteData(e)}>Delete</button>
                                <button data-id={obj._id} data-indx={indx} onClick={(e) => startEdit(e)}>{editState[indx]}</button>
                                <button data-id={obj._id} data-indx={indx} onClick={(e) => resetEdit(e)}>X</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        : ""
    )
}

export default DataTable;