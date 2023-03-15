import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import _ from "lodash";

const pageSize = 5;
var c ="";
const Nurse = () => {
  const [nurse, setNurse] = useState([]);
  const [name, setname] = useState("");
  const [gender, setgender] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [patientId, setpatientId] = useState("");
  const [deviceId, setdeviceId] = useState("");
  const [result, setresult] = useState("");
  const [userId, setuserid] = useState(null);
  const [formOpen, setformopen] = useState(false);
  const[filterVal,setFilterVal] = useState("");
  const[searchApiData,setSearchApiData] = useState(''); 
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const Add = () => {
    navigate('/addnurse');
  }
  const pageCount = nurse ? Math.ceil(nurse.length / pageSize) : 0;

  useEffect(() => {
       getNurse();
  }, []);

  const getNurse = async () => {
    try {
      const response = await fetch('https://localhost:44392/api/Nurse/GetNurse');
      const data = await response.json();
      setNurse(data);
      c = data;
      setSearchApiData(_(data).slice(0).value());
      setPaginatedPosts(_(data).slice(0).take(pageSize).value());

    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (e)=>
  {
     if(e.target.value==='')
     {
      setSearchApiData(_(c).slice((currentPage-1)*pageSize).take(pageSize).value());
      setPaginatedPosts(searchApiData);
     }
     else
     {
      const filterResult = searchApiData.filter(item=>item.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setPaginatedPosts(filterResult);
     }
     setFilterVal(e.target.value);
  }


  function deletenurse(id) {
    try {
      fetch(`https://localhost:44392/api/Nurse/Delete/${id}`, {
        method: 'DELETE'
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
        })
        getNurse()
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  function Updatenurse(id) {
    try {
      console.log(id);
      console.warn(nurse.find(t => t.id === id));
      setname((nurse.find(t => t.id === id)).name)
      setgender((nurse.find(t => t.id === id)).gender)
      setmobile((nurse.find(t => t.id === id)).mobile)
      setemail((nurse.find(t => t.id === id)).email)
      setpatientId((nurse.find(t => t.id === id)).patientId)
      setdeviceId((nurse.find(t => t.id === id)).deviceId)
      setresult((nurse.find(t => t.id === id)).result)
      setuserid((nurse.find(t => t.id === id)).id)
      setformopen(true);
    }
    catch (error) {
      console.log(error);
    }

  }

  function Update() {
    try {
      console.warn(name, gender, mobile, email, patientId, deviceId, result, userId);
      let item = { name, gender, mobile, email, patientId, deviceId, result, userId }
      fetch(`https://localhost:44392/api/Nurse/UpdateNurse/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then((result) => {

          getNurse()
        })
    }
    catch (error) {
      console.log(error);
    }
    setformopen(false);
  }
  if (pageCount === 1)
  return null;

const pages = _.range(1, pageCount + 1);

const pagination = (pageNo) => {
  setCurrentPage(pageNo);
  const startIndex = (pageNo - 1) * pageSize;
  const paginatedPost = _(nurse).slice(startIndex).take(pageSize).value();
  setPaginatedPosts(paginatedPost);
}

  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Nurse Table</h3>
      <div>
        <input className='form-control me-2' type="search"  placeholder='Search' value={filterVal} onInput={(e)=>handleFilter(e)}/>
      </div>
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
            <td>
              Action
            </td>

          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((nur) => (
            <tr key={nur.id}>
              <td>{nur.id}</td>
              <td>{nur.name}</td>
              <td>{nur.gender}</td>
              <td>{nur.mobile}</td>
              <td>{nur.email}</td>
              <td>{nur.patientId}</td>
              <td>{nur.deviceId}</td>
              <td>{nur.result}</td>
              <td><button style={{ marginRight: '10px' }} className='btn btn-warning' onClick={() => deletenurse(nur.id)}>Delete</button>
                <button className='btn btn-warning' onClick={() => Updatenurse(nur.id)}>Update</button>

              </td>

            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      <button className='btn btn-info' onClick={() => Add()}>Add Nurse Details</button>
      <br /><br />
      {formOpen && (
        <div>
          <input type="text" value={name} placeholder="name" onChange={(e) => setname(e.target.value)}></input><br /><br />
          <input type="text" value={gender} placeholder="gender" onChange={(e) => setgender(e.target.value)}></input><br /><br />
          <input type="number" value={mobile} placeholder="mobile" onChange={(e) => setmobile(e.target.value)}></input><br /><br />
          <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)}></input><br /><br />
          <input type="number" value={patientId} placeholder="patientId" onChange={(e) => setpatientId(e.target.value)}></input><br /><br />
          <input type="number" value={deviceId} placeholder="deviceId" onChange={(e) => setdeviceId(e.target.value)}></input><br /><br />
          <input type="text" value={result} placeholder="result" onChange={(e) => setresult(e.target.value)}></input><br /><br />
          <button type='submit' onClick={Update}>Update Data</button>
        </div>
      )}
        <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
          {
            pages.map((page) =>
            (

              <li
                className=
                {
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <p className='page-link' onClick={() => pagination(page)}>{page}</p></li>

            ))
          }
        </ul>
      </nav>

    </div>

  );
};

export default Nurse;
