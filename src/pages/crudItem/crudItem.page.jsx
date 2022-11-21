import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    const {bearer, setBearer} = useContext(BearerContext);
    const navigate = useNavigate();

    useEffect(function() {
        setValData([]);
        setLoader(true);
        // if(!initItem) {      
        try {
            fetch(`https://modular-ap.herokuapp.com/api/crud/${crudItemLow}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${bearer}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoader(false)
            })
        
            fetch(`https://modular-ap.herokuapp.com/api/data/${crudItemLow}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${bearer}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'fail') {
                    setLoader(false)
                    navigate("*")
                    return;
                }

                if(data.message.includes("expired")) {
                    setLoader(false)
                    setBearer("");
                }
                if(data.status === "error") {
                    navigate("*")
                    setLoader(false)
                    alert(data.message)
                    return;
                }
                setValData([...data.data])
            })
        } catch(error) {
        }
    }, [crudItemLow, bearer])
    return (
        <div className="crudItem-page">
        {loader ? <Loader /> :
            <>
                <FormContainer title={crudItem} DataForm={DataForm} data={data} setValData={setValData}/>
                <div className="data-table-container">
                    <DataTable bearer={bearer} crudItem={crudItem} parentData={valData} setParentData={setValData}/>
                </div>
            </>}
        </div>
    )
}

export default CrudItem;