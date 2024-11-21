import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Doctors Pages
import DoctorsIndex from './pages/doctors/Index';
import DoctorShow from './pages/doctors/Show';

// Patients Pages
import PatientsIndex from './pages/patients/Index';
import PatientShow from './pages/patients/Show';

// Appointment Pages
import AppointmentIndex from './pages/appointments/Index';

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

// import ProtectedRoute from './components/ProtectedRoute'
// import Create from './pages/festivals/Create';
// import Edit from './pages/festivals/Edit'
// import { AuthProvider } from "./utils/useAuth";

const App = () => {

    // We wrap the entire app in the auth provider
    // We no longer need to pass the auth state down from here, all our routes can get it from the context instead
    return (
        // <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Doctor routes */}
                    <Route path="/doctors" element={<DoctorsIndex />}/>
                    <Route path="/doctors/id" element={<DoctorShow />}/>

                    {/* Patients */}
                    <Route path="/patients" element={<PatientsIndex />}/>
                    <Route path="/patients/id" element={<PatientShow />}/>

                    {/* Appointments */}
                    <Route path="/appointments" element={<AppointmentIndex />}/>

                    {/* <Route path='/' element={<ProtectedRoute />}>
                        <Route path='/festivals/create' element={<Create />} />
                        <Route path='/festivals/:id/edit' element={<Edit />} />
                        <Route path='/festivals/:id' element={<SingleFestival />} />
                    </Route> */}
                    {/* <Route path='/login' element={<LoginForm />} /> */}
                    <Route path="/login" element={<LoginForm />} />
                    {/* <Route path='/register' element={<RegisterForm />} /> */}
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </Router>
        // </AuthProvider>
    );
};

export default App;