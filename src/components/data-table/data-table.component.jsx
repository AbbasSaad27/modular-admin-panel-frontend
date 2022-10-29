import React from "react";
import "./data-table.styles.css";

const DataTable = ({crudItem, setData, data = []}) => {
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
                                    if(typeof value === "object" && value !== null) formattedValue = value.join(", ");
                                    if(!value) formattedValue = "All Docs";
                                    else formattedValue = value;
                                    if(obj["__v"] === value) return ""
                                    return <td key={i+1}>{i === 0 ? (indx+1) : formattedValue}</td>
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
        : ""
    )
}

export default DataTable;