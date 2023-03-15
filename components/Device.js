import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import _ from "lodash";
var c ="";
var a ="";
const pageSize = 5;
const Device = () => {
  const [device, setDevice] = useState([])

  const [name, setname] = useState("");
  const [patientId, setpatientId] = useState("");
  const [patientinfo, setpatientinfo] = useState("");
  const [userId, setuserid] = useState(null);
  const [formOpen, setformopen] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState();
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getDeviceList();
  }, []);

  const pageCount = device ? Math.ceil(device.length / pageSize) : 0;


 
  console.log(currentPage);
    a = currentPage;
  const getDeviceList = async () => {
    try {
      const response = await fetch('https://localhost:44392/api/Device/GetDevice');
      const data = await response.json();
       c = data;
      setDevice(data);
      setSearchApiData(_(c).slice((a-1)*pageSize).take(pageSize).value());
      setPaginatedPosts(_(data).slice(0).take(pageSize).value());
      setname(data[0].name)
      setpatientId(data[0].patientId)
      setpatientinfo(data[0].patientinfo)
      setuserid(data[0].id)
   
     }
    catch (error) {
      console.log(error);
    }
  };
  console.log(c);

  
  const handleFilter = (e) => {
    if (e.target.value === '') {
    setSearchApiData(_(c).slice((currentPage-1)*pageSize).take(pageSize).value());
      setPaginatedPosts(searchApiData);
    }
    else {
      const filterResult = paginatedPosts.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
      // setDevice(filterResult);
      setPaginatedPosts(filterResult);
    }
    setFilterVal(e.target.value);
  }



  const navigate = useNavigate();
  const addDevice = () => {
    navigate('/adddevice');
  };


  function deleteuser(id) {
    try {
      fetch(`https://localhost:44392/api/Device/Delete/${id}`, {
        method: 'DELETE'
      }).then((result) => {
        result.json().then((resp) => {

        })
        getDeviceList()
      })
    }
    catch (error) {
      console.log(error);
    }
  }


  function Update() {
    try {
      console.warn(name, patientId, patientinfo, userId);
      let item = { name, patientId, patientinfo, userId }
      fetch(`https://localhost:44392/api/Device/UpdateDevice/${userId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then((result) => {

          getDeviceList()
        })
    }
    catch (error) {
      console.log(error);

    }
    setformopen(false);
  }


  function Updateuser(id) {
    try {
      console.log(id);
      console.warn(device.find(t => t.id === id));
      setname((device.find(t => t.id === id)).name)
      setpatientId((device.find(t => t.id === id)).patientId)
      setpatientinfo((device.find(t => t.id === id)).patientinfo)
      setuserid((device.find(t => t.id === id)).id)
      setformopen(true);
    }
    catch (error) {
      console.log(error);
    }
  }

  if (pageCount === 1)
    return null;

  const pages = _.range(1, pageCount + 1);
  
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    a = pageNo;
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(device).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  }
  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Device Table</h3>
      <div>
        <input className='form-control me-2' type="search" placeholder='Search' value={filterVal} onInput={(e) => handleFilter(e)} />
      </div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>PatientId</td>
            <td>PatientInfo</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((dev) => (
            <tr key={dev.id}>
              <td>{dev.id}</td>
              <td>{dev.name}</td>
              <td>{dev.patientId}</td>
              <td>{dev.patientinfo}</td>
              <td>
                <button style={{ marginRight: '20px' }} className='btn btn-warning' onClick={() => deleteuser(dev.id)}>Delete</button>
                <button className='btn btn-warning' onClick={() => Updateuser(dev.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br></br>
      <button className="btn btn-info" onClick={() => addDevice()}>
        Add Device
      </button>
      <br></br>
      <br></br>
      {formOpen && (
        <div>
          <input type="text" value={name} placeholder="name" onChange={(e) => setname(e.target.value)} /> <br /><br />
          <input type="number" value={patientId} placeholder="patientId" onChange={(e) => setpatientId(e.target.value)}></input><br /><br />
          <input type="text" value={patientinfo} placeholder="patientInfo" onChange={(e) => setpatientinfo(e.target.value)}></input><br></br><br></br>
          <button type="button" onClick={Update}>Insert</button>
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

export default Device;
