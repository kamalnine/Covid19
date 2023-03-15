import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddPatientDetails from './components/AddPatientDetails';
import Device from './components/Device';
import Patient from './components/Patient';
import Nurse from './components/Nurse';
import AddDeviceDetails from './components/AddDeviceDetails';
import AddNurseDetail from './components/AddNurseDetail';
import MainHeader from './MainHeader'
import HomePage from './HomePage';
import Error from './Error';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import UserDevice from './components/UserDevice';
import UserPatient from './components/UserPatient';
import UserNurse from './components/UserNurse';

function App(props) {

    return <BrowserRouter>
        <Routes>
            <Route index element={<SignupForm />} />
            <Route path='/login' element={<Login />} />
        
            <Route path='/' element={<MainHeader />}>
                <Route path='/home' element={<HomePage />} />
                <Route path='/patient' element={<Patient />} />
                <Route path='/nurse' element={<Nurse />} />
                <Route path='/device' element={<Device />} />
                <Route path='/addpatient' element={<AddPatientDetails />} />
                <Route path='/addnurse' element={<AddNurseDetail />} />
                <Route path='/adddevice' element={<AddDeviceDetails />} />
                <Route path='/UserDevice' element={<UserDevice />} />
                <Route path='/userPatient' element={<UserPatient />} />
                <Route path='/UserNurse' element={<UserNurse />} />
            </Route>

            <Route path='*' element={<Error />} />
        </Routes>

    </BrowserRouter>

}

export default App;
