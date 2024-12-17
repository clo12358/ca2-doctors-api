import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../utils/useAuth";
import { Link } from "react-router-dom";

const Index = () => {
    const { token } = useAuth();
    const [appointments, setAppointments] = useState(null);
    const [doctors, setDoctors] = useState({});
    const [patients, setPatients] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const formatDate = (date) => {
        const appointmentDate = new Date(date);
        return appointmentDate.toLocaleDateString("en-US", {
            weekday: 'long', 
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/appointments', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setAppointments(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching appointments", err);
            });

        axios.get('https://fed-medical-clinic-api.vercel.app/doctors', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const doctorMap = response.data.reduce((acc, doctor) => {
                    acc[doctor.id] = `${doctor.first_name} ${doctor.last_name}`;
                    return acc;
                }, {});
                setDoctors(doctorMap);
            })
            .catch(err => console.error('Error loading doctors', err));

        axios.get('https://fed-medical-clinic-api.vercel.app/patients', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const patientMap = response.data.reduce((acc, patient) => {
                    acc[patient.id] = `${patient.first_name} ${patient.last_name}`;
                    return acc;
                }, {});
                setPatients(patientMap);
            })
            .catch(err => console.error('Error loading patients', err));
    }, [token]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            axios
                .delete(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log("Appointment deleted successfully", response);
                    setAppointments(appointments.filter((appointment) => appointment.id !== id));
                    alert("Appointment successfully deleted.");
                })
                .catch((err) => {
                    console.error("Error deleting appointment", err);
                    alert("Failed to delete the appointment.");
                });
        }
    };

    if (isLoading) return (
        <div
            role="alert"
            className="alert alert-warning"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '1rem',
                width: '300px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
            }}
        >
            <span className="loading loading-infinity loading-lg"></span>
            <span className='font-bold'>
                Loading Appointments
            </span>
        </div>
    );

    if (!appointments) return (
        <div
            role="alert"
            className="alert alert-danger"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '1rem',
                width: '300px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: '#f03524',
                border: '1px solid #f5c6cb',
            }}
        >
            <span className="loading loading-infinity loading-lg text-white"></span>
            <span className='font-bold text-white'>
                You do not have authorisation, please login!
            </span>
        </div>
    );

    return (
        <div className="w-full px-4 py-6 lg:px-8">
            {/* Create Appointment Button */}
            <div className="flex justify-end mb-4">
                <button
                    className="btn btn-success text-base-100 btn-sm"
                    onClick={() => navigate('/appointments/create')}
                >
                    Create Appointment
                </button>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table w-full text-left">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Appointment Date</th>
                            <th className="px-4 py-2">Doctor</th>
                            <th className="px-4 py-2">Patient</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(({ id, appointment_date, doctor_id, patient_id }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://icons.veryicon.com/png/o/miscellaneous/icon-library-of-x-bacteria/appointment-4.png"
                                                    alt="Appointment"
                                                />
                                            </div>
                                        </div>
                                        {/* Display the formatted date */}
                                        <div>{formatDate(appointment_date)}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{doctors[doctor_id]}</td>
                                <td className="px-4 py-3">{patients[patient_id]}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        className="btn btn-error btn-sm text-base-100"
                                        onClick={() => handleDelete(id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`edit`} className="btn btn-info btn-sm text-base-100">
                                        Edit Appointment
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
