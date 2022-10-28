import React from "react";
import "./data-table.styles.css";

const DataTable = ({crudItem, setData, data = []}) => {
    console.log(data)
    return (
        data[0] ? 
        <table className="data-table">
            <thead>
                <tr>
                    {Object.keys(data[0]).map((title, i) => {
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
                                    return <td key={i+1}>{i === 0 ? (indx+1) : value}</td>
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