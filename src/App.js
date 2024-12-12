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
import AppointmentCreate from "./pages/appointments/Create";

// Diagnoses
import DiagnosesIndex from './pages/diagnoses/Index';

// Presecriptions
import PrescriptionsIndex from './pages/prescriptions/Index';
import PrescriptionsShow from './pages/prescriptions/Show';

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
                    <Route path="/appointments/create" element={<AppointmentCreate />}/>

                    {/* Diagnoses */}
                    <Route path="/diagnoses" element={<DiagnosesIndex />}/>

                    {/* Prescriptions */}
                    <Route path="/prescriptions" element={<PrescriptionsIndex />}/>
                    <Route path="/prescriptions/:id" element={<PrescriptionsShow />}/>

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
         </AuthProvider>
    );
};

export default App;