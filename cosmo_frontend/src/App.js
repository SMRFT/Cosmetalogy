import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Logo from '../src/components/images/salem-cosmetic-logo.png';
import './App.css'
import { DoctorLogin, PharmacistLogin, ReceptionistLogin } from './components/Login';
import Pharmacy from './components/Pharmacy';
import Reception from './components/Reception';
import Doctor from './components/Doctor';
import HomePage from './components/HomePage';

function App() {
  const location = useLocation();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    setUserRole(localStorage.getItem('userRole'));
  }, [location]);

  return ( 
    <div className="App">
      <div className="logo-container">
        <img src={Logo} alt="Shanmuga Hospital Logo" className="logo" />
      </div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/PharmacistLogin' element={<PharmacistLogin setUserRole={setUserRole} />} />
          <Route path='/DoctorLogin' element={<DoctorLogin setUserRole={setUserRole} />} />
          <Route path='/ReceptionistLogin' element={<ReceptionistLogin setUserRole={setUserRole} />} />
          <Route path='/Pharmacy' element={<Pharmacy />} />
          <Route path='/Reception' element={<Reception />} />
          <Route path='/Doctor' element={<Doctor />} />
        </Routes>
    </div>
  );
}

export default App;
