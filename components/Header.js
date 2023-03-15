import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import Tour from './Tour';
function Header(props) {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const email1 = email;
  const password1 = password;
  var isAuthenticated = (email1 === "kamal@gmail.com" && password1 === "kamal123#") || (email1 === "kamalsutte786@gmail.com" && password1 === "kamal786#");


  return (
    <div>
      {isAuthenticated ?
      
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li className="nav-item" style={{ marginLeft: "30px" }}>
                  <NavLink to="/home" className="home" style={{ textDecoration: "none", color: "black" }}>Home</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/patient" className="patient" style={{ textDecoration: "none", color: "black" }}>Patient List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/nurse" className="nurse" style={{ textDecoration: "none", color: "black" }}>Nurse List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/device" className="device" style={{ textDecoration: "none", color: "black" }}>Device List</NavLink>
                </li>
                <div style={{marginLeft:"30px"}}>
              <Tour/>
             </div>
              </ul>
              <ul className='navbar-nav'>
                <li className='nav-item' style={{ marginLeft: "800px" }}>
                  <h5> (Admin) Welcome {localStorage.getItem('name')}</h5>
                </li>

                <li className='nav-item' style={{ marginLeft: "50px" }}>
                  <NavLink to="/login" style={{ textDecoration: "none", color: "black" }}>
                    <Button startIcon={<LogoutIcon />} color="secondary" variant="contained">
                      Logout
                    </Button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        :
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li className="nav-item" style={{ marginLeft: "50px" }}>
                  <NavLink to="/home" className="home" style={{ textDecoration: "none", color: "black" }}>Home</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/UserPatient" className="patient" style={{ textDecoration: "none", color: "black" }}>Patient List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/UserNurse" className="nurse" style={{ textDecoration: "none", color: "black" }}>Nurse List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/UserDevice" className="device" style={{ textDecoration: "none", color: "black" }}>Device List</NavLink>
                </li>
              </ul>
             <div style={{marginLeft:"30px"}}>
              <Tour/>
             </div>
              <ul className='navbar-nav'>
                <li className='nav-item' style={{ marginLeft: "760px" }}>
                  <h4>Welcome {localStorage.getItem('name')}</h4>
                </li>

                <li className='nav-item' style={{ marginLeft: "50px" }}>
                  <NavLink to="/login" style={{ textDecoration: "none", color: "black" }}>
                    <Button startIcon={<LogoutIcon />} color="secondary" variant="contained">
                      Logout
                    </Button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>}


    </div>


  )
}

export default Header
