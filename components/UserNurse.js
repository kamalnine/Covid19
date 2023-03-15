import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';




const UserNurse = () => {
  const [nurse, setNurse] = useState([]);

  useEffect(() => {

    getNurse();
  }, []);

  const getNurse = async () => {
    try {
      var id = localStorage.getItem('Id');
      const response = await fetch(`https://localhost:44392/api/Nurse/GetPatId?id=${id}`);
      const data = await response.json();
      setNurse(data);
      
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Nurse Table</h3>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Gender</td>
            <td>Mobile</td>
            <td>Email</td>
            <td>PatientId</td>
            <td>DeviceId</td>
            <td>result</td>

          </tr>
        </thead>
        <tbody>
          
            <tr>
              <td>{nurse.id}</td>
              <td>{nurse.name}</td>
              <td>{nurse.gender}</td>
              <td>{nurse.mobile}</td>
              <td>{nurse.email}</td>
              <td>{nurse.patientId}</td>
              <td>{nurse.deviceId}</td>
              <td>{nurse.result}</td>
            </tr>
       
        </tbody>
      </Table>
      <br></br><br></br>
    </div>
  )
}

export default UserNurse
