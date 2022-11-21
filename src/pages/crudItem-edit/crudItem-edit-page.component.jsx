import React from 'react'
import "./crudItem-edit.styles.css"

import FormContainer from '../../components/form-container/form-container.component'
import FormForCrud from '../../components/formForCrud/formForCrud.component'
import { useParams } from 'react-router-dom'

const CrudItemEdit = () => {
    const {crudItem} = useParams()
    return(
        <FormContainer formTitle={`Edit ${crudItem}`} DataForm={FormForCrud}/>
    )
}

export default CrudItemEdit;