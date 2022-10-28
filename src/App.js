import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css';
import FormContainer from './components/form-container/form-container.component';
import Loader from './components/loader/loader.component';
import SideBar from './components/sidebar/sidebar.component';
import CrudItem from './pages/crudItem/crudItem.page';
import FormForCrud from './components/formForCrud/formForCrud.component';

import UserContext from './utilities/contexts/userContexts/userContext';

function App() {
  const [sideMenus, setSideMenus] = useState(undefined)
  // const UserContext = createContext();

  useEffect(function() {  
    fetch("https://modular-ap.herokuapp.com/api/crud")
    .then(res => res.json())
    .then(data => setSideMenus([ ...data.crudItems]))
  }, [])
  return (
      sideMenus ? 
        <>
          {/* <UserContext.Provider value={sideMenus}> */}
            <Router>
              <div className="App">
                <SideBar sideMenus={sideMenus}/>
                <Routes>
                  <Route path='/' element={<FormContainer title="Crud Name" setSideMenus={setSideMenus} sideMenus={sideMenus} DataForm={FormForCrud}/>}></Route>
                  <Route path='/crudItem/:crudItem' element={<UserContext.Provider value={sideMenus}><CrudItem /></UserContext.Provider>}></Route>
                </Routes>
              </div>
            </Router>
          {/* </UserContext.Provider> */}
        </>
     : <Loader />
  );
}

export default App;
