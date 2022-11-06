import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import DataForm from "../../components/data-form/dataForm.component";
import DataTable from "../../components/data-table/data-table.component";
import FormContainer from "../../components/form-container/form-container.component";
import Loader from "../../components/loader/loader.component";

import BearerContext from "../../utilities/contexts/bearerContext/bearerContext";

import './crudItem.styles.css';

const CrudItem = () => {
    const {crudItem} = useParams();
    const [loader, setLoader] = useState(true)
    const [valData, setValData] = useState([])
    const [data, setData] = useState({})
    const crudItemLow = crudItem.toLowerCase();
    const bearer = useContext(BearerContext);

    useEffect(function() {
        setValData([]);
        setLoader(true);
        // if(!initItem) {      
            fetch(`https://modular-ap.herokuapp.com/api/crud/${crudItemLow}`, {
                method: "GET",
                headers: {
                    "Authorization": bearer
                }
            })
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoader(false)
            })
        // } else {
        //     setData(initItem);
        //     setLoader(false)
        // }
        
        fetch(`https://modular-ap.herokuapp.com/api/data/${crudItemLow}`, {
            method: "GET",
            headers: {
                "Authorization": bearer
            }
        })
        .then(res => res.json())
        .then(data => setValData([...data.data]))
        .catch((err) => console.log(err))
    }, [crudItemLow, bearer])
    return (
        <div className="crudItem-page">
        {loader ? <Loader /> :
            <>
                <FormContainer title={crudItem} DataForm={DataForm} data={data} setValData={setValData}/>
                <div className="data-table-container">
                    <DataTable crudItem={crudItem} data={valData}/>
                </div>
            </>}
        </div>
    )
}

export default CrudItem;