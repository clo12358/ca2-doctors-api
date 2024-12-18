import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../../utils/useAuth";

const ShowAppointment = () => {
    const { token } = useAuth();
    const [appointment, setAppointment] = useState(null);
    const [doctorName, setDoctorName] = useState("");
    const [patientName, setPatientName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    // Format date function
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
        axios.get(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setAppointment(res.data);
                const { doctor_id, patient_id } = res.data;

                // Doctors
                axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${doctor_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((doctorRes) => {
                        setDoctorName(`${doctorRes.data.first_name} ${doctorRes.data.last_name}`);
                    })
                    .catch((err) => console.error("Error loading doctor:", err));

                // Patients
                axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${patient_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((patientRes) => {
                        setPatientName(`${patientRes.data.first_name} ${patientRes.data.last_name}`);
                    })
                    .catch((err) => console.error("Error loading patient:", err));

            })
            .catch((err) => console.error("Error loading appointment:", err));
    }, [id, token]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            axios
                .delete(`https://fed-medical-clinic-api.vercel.app/appointments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    alert("Appointment successfully deleted.");
                    navigate("/appointments"); // Navigate to appointments list
                })
                .catch((err) => {
                    console.error("Error deleting appointment", err);
                    alert("Failed to delete the appointment.");
                });
        }
    };

    if (!appointment) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Appointment Details</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    {/* Patient */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Patient</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{patientName || "Loading..."}</dd>
                    </div>

                    {/* Doctor */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Doctor</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{doctorName || "Loading..."}</dd>
                    </div>

                    {/* Appointment Date */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Appointment Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDate(appointment.appointment_date)}</dd>
                    </div>

                    {/* Actions */}
                    <button className="btn btn-error text-base-100" onClick={handleDelete}>Delete</button>
                    <Link to={`edit`} className="btn btn-info text-base-100">Edit Appointment</Link>
                </dl>
            </div>
        </div>
    );
};

export default ShowAppointment;
