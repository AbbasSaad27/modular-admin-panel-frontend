import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import {useLocation} from "react-router-dom"

import './App.css';
import FormContainer from './components/form-container/form-container.component';
import Loader from './components/loader/loader.component';
import SideBar from './components/sidebar/sidebar.component';
import CrudItem from './pages/crudItem/crudItem.page';
import FormForCrud from './components/formForCrud/formForCrud.component';

import UserContext from './utilities/contexts/userContexts/userContext';
import BearerContext from './utilities/contexts/bearerContext/bearerContext';
import Login from './pages/login/login.page';
import ErrorPage from './pages/404page/error.page';

function App() {
  const [sideMenus, setSideMenus] = useState(undefined)
  const [bearer, setBearer] = useState(null)
  const location = useLocation()

  useEffect(function() {
    if(bearer) {  
      fetch("https://modular-ap.herokuapp.com/api/crud", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${bearer}`,
        }
      })
      .then(res => res.json())
      .then(data => setSideMenus([ ...data.crudItems]))
    }
  }, [bearer])
  return (
        <BearerContext.Provider value={{bearer, setBearer}}>
            <>
              <div className="App">
                { sideMenus && location.pathname !== "/login" && !location.pathname.includes("*") ? 
                  <SideBar sideMenus={sideMenus}/> : bearer ? <Loader />: "" }
                <Routes>
                  <Route path='/' element={<FormContainer title="Crud Name" setSideMenus={setSideMenus} sideMenus={sideMenus} DataForm={FormForCrud}/>}></Route>
                  <Route path="/login" element={<Login setBearer={setBearer}/>}></Route>
                  <Route path='/crudItem/:crudItem' element={<UserContext.Provider value={sideMenus}><CrudItem /></UserContext.Provider>}></Route>
                  <Route path='*' element={<ErrorPage />}></Route>
                </Routes>
              </div>
            </>
        </BearerContext.Provider>
  );
}

export default App;
