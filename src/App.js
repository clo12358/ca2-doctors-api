import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Doctors Pages
import DoctorsIndex from './pages/doctors/Index';
import DoctorShow from './pages/doctors/Show';
import DoctorCreate from "./pages/doctors/Create";
import DoctorEdit from './pages/doctors/Edit';

// Patients Pages
import PatientsIndex from './pages/patients/Index';
import PatientShow from './pages/patients/Show';
import PatientCreate from "./pages/patients/Create";

// Appointment Pages
import AppointmentIndex from './pages/appointments/Index';
import AppointmentShow from './pages/appointments/Show';
import AppointmentCreate from "./pages/appointments/Create";
import AppointmentEdit from "./pages/appointments/Edit";

// Diagnoses
import DiagnosesIndex from './pages/diagnoses/Index';
import DiagnosesCreate from './pages/diagnoses/Create';
// import DiagnosesEdit from './pages/diagnoses/Edit';

// Presecriptions
import PrescriptionsIndex from './pages/prescriptions/Index';
import PrescriptionsShow from './pages/prescriptions/Show';
import PrescriptionsCreate from './pages/prescriptions/Create';

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import { AuthProvider } from "./utils/useAuth";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Doctor routes */}
                    <Route path="/doctors" element={<DoctorsIndex />}/>
                    <Route path="/doctors/:id" element={<DoctorShow />}/>
                    <Route path="/doctors/create" element={<DoctorCreate />}/>
                    <Route path="/doctors/:id/edit" element={<DoctorEdit />}/>

                    {/* Patients */}
                    <Route path="/patients" element={<PatientsIndex />}/>
                    <Route path="/patients/:id" element={<PatientShow />}/>
                    <Route path="/patients/create" element={<PatientCreate />}/>

                    {/* Appointments */}
                    <Route path="/appointments" element={<AppointmentIndex />}/>
                    <Route path="/appointments:id" element={<AppointmentShow />}/>
                    <Route path="/appointments/create" element={<AppointmentCreate />}/>
                    <Route path="/appointments/:id/edit" element={<AppointmentEdit />}/>

                    {/* Diagnoses */}
                    <Route path="/diagnoses" element={<DiagnosesIndex />}/>
                    {/* <Route path="/diagnoses/:id/edit" element={<DiagnoseseEdit />}/> */}
                    <Route path="/diagnoses/create" element={<DiagnosesCreate />}/>

                    {/* Prescriptions */}
                    <Route path="/prescriptions" element={<PrescriptionsIndex />}/>
                    <Route path="/prescriptions/:id" element={<PrescriptionsShow />}/>
                    <Route path="/prescriptions/create" element={<PrescriptionsCreate />}/>

                    {/* Login & Register */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </Router>
         </AuthProvider>
    );
};

export default App;