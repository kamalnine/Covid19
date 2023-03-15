import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function AddDeviceDetails() {
    const[name,setname] = useState();
    const[patientId,setpatientId] = useState();
    const[patientinfo,setpatientinfo] = useState();
    const navigate = useNavigate();
   async function onSubmit()
    {
      try{
       console.log({name,patientId,patientinfo});
       let item = {name,patientId,patientinfo}
       let result = await fetch("https://localhost:44392/api/Device",{
        method:"POST",
         body:JSON.stringify(item),
        headers: {
            "Content-Type" : "application/json",
            "Accept":"application/json"
        }
     })   
     result = await result.json()
     console.warn("result",result);
  navigate('/device')
    }
    catch(error)
    {
      console.log(error);
    }

    }
  return (
    <div>
      <h2>Device Details</h2>
      <br></br>
      
        <div className='row'>
        <div className='col md-4'>
        <label>Enter the device name: </label>
        <input type="text" name='name' value={name} onChange={(e)=>setname(e.target.value)}/>
        </div>
        <br></br>
        <div className='col md-4'>
        <label>Enter the patient id: </label>
        <input type="number" name='patientId' value={patientId} onChange={(e)=>setpatientId(e.target.value)}/>
        </div>
        <br></br>
        <div className='col md-4'>
        <label>Enter the PatientInfo: </label>
        <input type="text" name='patientInfo' value={patientinfo} onChange={(e)=>setpatientinfo(e.target.value)}/>
        </div>
        <br></br>
        <br/>
        </div>
        <br></br>
        <button  onClick={onSubmit} className='btn btn-info' type='submit'>Add New Device</button>
    </div>
  )
}

export default AddDeviceDetails
