import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';



const UserPatient = () => {
  const [patient, setPatient] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var email = localStorage.getItem('email');
    const response = await fetch(`https://localhost:44392/api/Patient/GetData?email=${email}`);
    const jsonData = await response.json();
    setPatient(jsonData);
   

  };
  console.log(patient.id);
  localStorage.setItem('Id',patient.id);

return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Patient Table</h3>

      <Table striped bordered>
        <thead>
          <tr>
            <td>Id</td>
            <td>Password</td>
            <td>firstname</td>
            <td>Lastname</td>
            <td>Gender</td>
            <td>DOB</td>
            <td>Address</td>
            <td>Mobile</td>
            <td>Date</td>
            <td>Email</td>


          </tr>
        </thead>
        <tbody>


          <td>{patient.id}</td>
          <td>{patient.password}</td>
          <td>{patient.firstname}</td>
          <td>{patient.lastname}</td>
          <td>{patient.gender}</td>
          <td>{patient.dob}</td>
          <td>{patient.address}</td>
          <td>{patient.mobile}</td>
          <td>{patient.date}</td>
          <td>{patient.email}</td>


        </tbody>
      </Table>
      <br></br><br></br>


    </div>
  )
}

export default UserPatient
