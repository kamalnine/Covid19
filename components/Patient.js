import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
import _ from "lodash";

const pageSize = 5;
var c ="";

function Patient(props) {
  const [patient, setPatient] = useState([]);

  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [address, setaddress] = useState("");
  const [mobile, setmobile] = useState("");
  const [date, setdate] = useState("");
  const [email, setemail] = useState("");
  const [userId, setuserid] = useState(null);
  const [formOpen, setformopen] = useState(false);
  const[filterVal,setFilterVal] = useState("");
  const[searchApiData,setSearchApiData] = useState('');  
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  const navigate = useNavigate();

  const GoToAdd = () => {
    navigate('/addpatient');
  }

  const pageCount = patient? Math.ceil(patient.length / pageSize) : 0;
  useEffect(() => {
    getPatientList();
  }, []);

  function getPatientList() {
    try {
      fetch('https://localhost:44392/api/Patient/getPatient')
        .then((response) => response.json())
        .then((data) => {
          setPatient(data);
          c = data;
          setSearchApiData(_(data).slice(0).take(pageSize).value());
          setPaginatedPosts(_(data).slice(0).take(pageSize).value());
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  
  }
  
  const handleFilter=(e)=>
  {
    if(e.target.value === '')
    {
      setSearchApiData(_(c).slice((currentPage-1)*pageSize).take(pageSize).value());
      setPaginatedPosts(searchApiData);
    }
    else
    {
     const filterResult =  searchApiData.filter(item => item.firstname.toLowerCase().includes(e.target.value.toLowerCase()));
    setPaginatedPosts(filterResult)
    }
    setFilterVal(e.target.value);
  }

  function deletePatient(id) {
    try {
      fetch(`https://localhost:44392/api/Patient/Delete/${id}`, {
        method: 'DELETE'
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
        })
        getPatientList()
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  function UpdatePatient(id) {
    try {
      let item = patient.find(t => t.id === id)
      console.log(id);
      console.warn(patient.find(t => t.id === id));
      setpassword(item.password)
      setfirstname(item.firstname)
      setlastname(item.lastname)
      setgender(item.gender)
      setdob(item.dob)
      setaddress(item.address)
      setmobile(item.mobile)
      setdate(item.date)
      setemail(item.email)
      setuserid(item.id)
      setformopen(true);
    }
    catch (error) {
      console.log(error);
    }

  }

  function Update() {
    try {
      console.log({ password, firstname, lastname, gender, dob, address, mobile, date, email, userId })
      let item = { password, firstname, lastname, gender, dob, address, mobile, date, email, userId }
      fetch(`https://localhost:44392/api/Patient/UpdatePatient/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then((result) => {

          getPatientList()
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
  const paginatedPost = _(patient).slice(startIndex).take(pageSize).value();
  setPaginatedPosts(paginatedPost);
}


  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Patient Table</h3>
      <div>
        <input className='form-control me-2' type="search"  placeholder='Search' value={filterVal} onInput={(e)=>handleFilter(e)}/>
      </div>
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
            <td>Action</td>

          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((pat) => (
            <tr key={pat.id}>
              <td>{pat.id}</td>
              <td>{pat.password}</td>
              <td>{pat.firstname}</td>
              <td>{pat.lastname}</td>
              <td>{pat.gender}</td>
              <td>{pat.dob}</td>
              <td>{pat.address}</td>
              <td>{pat.mobile}</td>
              <td>{pat.date}</td>
              <td>{pat.email}</td>
              <td><button style={{ marginRight: "20px" }} className='btn btn-warning' onClick={() => deletePatient(pat.id)}>Delete</button>
                <button className='btn btn-warning' onClick={() => UpdatePatient(pat.id)}>Update</button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
      <button className="btn btn-info" onClick={() => GoToAdd()}>
        Add New Patient
      </button>
      <br /><br />
      {formOpen && (
        <div>
          <input type="text" value={password} placeholder="PASSWORD" onChange={(e) => setpassword(e.target.value)}></input><br /><br />
          <input type="text" value={firstname} placeholder="firstname" onChange={(e) => setfirstname(e.target.value)}></input><br /><br />
          <input type="text" value={lastname} placeholder="lastname" onChange={(e) => setlastname(e.target.value)}></input><br /><br />
          <input type="text" value={gender} placeholder="gender" onChange={(e) => setgender(e.target.value)}></input><br /><br />
          <input type="text" value={dob} placeholder="dob" onChange={(e) => setdob(e.target.value)}></input><br /><br />
          <input type="text" value={address} placeholder="address" onChange={(e) => setaddress(e.target.value)}></input><br /><br />
          <input type="number" value={mobile} placeholder="mobile" onChange={(e) => setmobile(e.target.value)}></input><br /><br />
          <input type="text" value={date} placeholder="date" onChange={(e) => setdate(e.target.value)}></input><br /><br />
          <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)}></input><br /><br />
          <button type="submit" onClick={Update} >Update Data</button>

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
}

export default Patient;