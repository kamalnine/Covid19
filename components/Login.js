import React, { useState} from 'react'
import { useNavigate } from 'react-router';
import LoginIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,

}
  from 'mdb-react-ui-kit';
function Login(props) {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [errorMsg, seterrorMsg] = useState("");
  const [errorMsg1, seterrorMsg1] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
   const encodedpassword = encodeURIComponent(password);
  async function login(props) {
    localStorage.setItem('email',email);
    localStorage.setItem('password',password);
    console.warn({ email, password });
    try {
      let item = { email, password };
      let result = await fetch(`https://localhost:44392/api/Login?email=${email}&password=${encodedpassword}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });
      result = await result.json();
      console.log(result);
      localStorage.setItem('par',result);
      let item2 = { email, password }
      let result1 = await fetch(`https://localhost:44392/api/Login/GetName?email=${email}&password=${encodedpassword}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item2)
      });
      result1 = await result1.json();
      console.log(result1);
      localStorage.setItem('name',result1);
      console.log(`Global name is ${result1}`);


      if (result === "Authorized") {
        setisLoggedIn(true);
        navigate('/home');

      }
      else {
        console.log("User not found");
        setisLoggedIn(false);
      }
    }
    catch (error) {
      console.log(error)
    }

    try {
      if (email === '') {
        setisLoggedIn(true);
        seterrorMsg("Please Enter An Email");

        return false;
      }
      seterrorMsg("");
      return true;
    }
    catch (error) {
      console.log(error);
    }
  

  }

  function validate() {
    try {
      if (password === '') {
        setisLoggedIn(true);
        seterrorMsg1("Please Enter A Password");
        return false;
      }
      seterrorMsg1("");
      return true;
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleBoth = () => {

    login();
    validate();
  }


  return (


    <MDBContainer fluid style={{ backgroundColor: "#508bfc", height: '1000px' }}>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px', top: "-100px" }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Login</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' value={email} onChange={(e) => setemail(e.target.value)} type='email' size="lg" />
              {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : ""}
              <MDBInput wrapperClass='mb-4 w-100' label='Password' value={password} onChange={(e) => setpassword(e.target.value)} type={showPassword ? 'text' : 'password'} size="lg" />
              <Button type='Button' onClick={toggleShowPassword} style={{ left: '400px', top: "245px", display: "inline-block", position: "absolute", border: "none", background: "transparent", cursor: "pointer" }}>{showPassword ? <FaEye /> : <FaEyeSlash />}</Button>
              {errorMsg1 ? <p style={{ color: "red" }}>{errorMsg1}</p> : ""}

              <Button startIcon={<LoginIcon />} onClick={handleBoth} color="primary" variant="contained">  Login </Button>
              <br />
              {isLoggedIn ? "" : <p style={{ fontWeight: "bold" }}>Email or Password is Incorrect</p>}



              <p>New User?<a href="/">Create Account</a></p>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  )
}


export default Login;
