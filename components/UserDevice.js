import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';


const UserDevice = () => {

  const [device, setDevice] = useState([]);
  useEffect(() => {
    getDeviceList();
  }, []);

  const getDeviceList = async () => {
    try {
      var id = localStorage.getItem('Id');
      const response = await fetch(`https://localhost:44392/api/Device/GetPatId?id=${id}`);
      const data = await response.json();
      console.log(data);
      setDevice(data);
       


    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Device Table</h3>
     
      <Table striped bordered responsive>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>PatientId</td>
            <td>PatientInfo</td>

          </tr>
        </thead>
        <tbody>
          <tr>
         
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.patientId}</td>
              <td>{device.patientinfo}</td>
            </tr>
        
        </tbody>
      </Table>

    </div>
  )
}

export default UserDevice
