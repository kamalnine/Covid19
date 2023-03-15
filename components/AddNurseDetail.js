import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function AddNurseDetail() {
    const [name, setname] = useState();
    const [gender, setgender] = useState();
    const [mobile, setmobile] = useState();
    const [email, setemail] = useState();
    const [patientId, setpatientId] = useState();
    const [deviceId, setdeviceId] = useState();
    const [result, setresult] = useState();
    const navigate = useNavigate();

    async function onSubmit() {
        try {
            console.log({ name, gender, mobile, email, patientId, deviceId, result });
            let item = { name, gender, mobile, email, patientId, deviceId, result }
            let res = await fetch("https://localhost:44392/api/Nurse", {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }

            })
            res = await res.json()
            console.warn("result", res);
            navigate('/nurse')
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div >
            <h2>Nurse Details</h2>
            <br></br>

            <div className='row'>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the Nurse name: </label>
                        <input type="text" name="nname" value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                </div>
                <div className='col md-3'>
                    <div className='form-group'>
                        <label>Enter the gender: </label>
                        <input type="text" name="ngender" value={gender} onChange={(e) => setgender(e.target.value)} />
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the mobile: </label>
                        <input type="number" name="nmobile" value={mobile} onChange={(e) => setmobile(e.target.value)} />
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the Email: </label>
                        <input type="email" name="nemail" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                </div>
                <br></br><br></br><br></br>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the PatientId: </label>
                        <input type="number" name="npId" value={patientId} onChange={(e) => setpatientId(e.target.value)} />
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the deviceId: </label>
                        <input type="number" name="ndId" value={deviceId} onChange={(e) => setdeviceId(e.target.value)} />
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the result: </label>
                        <input type="text" name="nresult" value={result} onChange={(e) => setresult(e.target.value)} />
                    </div>
                </div>
            </div>
            <br></br><br></br>
            <button type='submit' onClick={onSubmit} className='btn btn-info'>Add Nurse Details</button>


        </div>
    )
}

export default AddNurseDetail
