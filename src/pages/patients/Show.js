import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Show = () => {
    const { token } = useAuth();
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch patient details
    const getPatientById = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPatient(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    // Fetch appointments for the patient
    const getPatientAppointments = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/appointments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const patientAppointments = res.data.filter((appointment) => appointment.patient_id === parseInt(id));
            setAppointments(patientAppointments);
        } catch (e) {
            console.error(e);
        }
    };

    // Fetch prescriptions for the patient
    const getPatientPrescriptions = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const patientPrescriptions = res.data.filter((prescription) => prescription.patient_id === parseInt(id));
            setPrescriptions(patientPrescriptions);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getPatientById(id);
            await getPatientAppointments(id);
            await getPatientPrescriptions(id);
        };
        fetchData();
    }, [id]);

    // Delete patient
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            // Delete appointments
            const deleteAppointmentJobs = appointments.map((appointment) =>
                axios.delete(`https://fed-medical-clinic-api.vercel.app/appointments/${appointment.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            );
            // Delete prescriptions
            const deletePrescriptionJobs = prescriptions.map((prescription) =>
                axios.delete(`https://fed-medical-clinic-api.vercel.app/prescriptions/${prescription.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            );
            
            // Perform delete operations in parallel
            Promise.all([...deleteAppointmentJobs, ...deletePrescriptionJobs])
                .then(() => {
                    axios.delete(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).then(() => {
                        alert("Patient successfully deleted.");
                        navigate("/patients");
                    });
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to delete the patient.");
                });
        }
    };

    if (!patient)
        return (
            <div
                role="alert"
                className="alert alert-danger"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "1rem",
                    width: "300px",
                    textAlign: "center",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    backgroundColor: "#f03524",
                    border: "1px solid #f5c6cb",
                }}
            >
                <span className="loading loading-infinity loading-lg text-white"></span>
                <span className="font-bold text-white">You do not have authorization, please login!</span>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg border overflow-hidden">
            <div className="bg-gray-100 px-8 py-6 border-b">
                <h3 className="text-2xl font-semibold text-gray-900">Patient Profile</h3>
                <p className="text-sm text-gray-500">Detailed information about the patient</p>
            </div>

            <div className="p-8">
                <dl className="divide-y divide-gray-200">
                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                        <dd className="text-lg text-gray-900 col-span-2">
                            {patient.first_name} {patient.last_name}
                        </dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{patient.email}</dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{patient.phone}</dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{patient.date_of_birth}</dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{patient.address}</dd>
                    </div>
                </dl>

                {/* Appointments */}
                <h1 className="text-xl font-semibold mt-8">Appointments</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <div key={appointment.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                                <h4 className="font-bold text-gray-800">Date: {appointment.date}</h4>
                                <p className="text-sm text-gray-600">Doctor: {appointment.doctor_name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No appointments</p>
                    )}
                </div>

                {/* Prescriptions */}
                <h1 className="text-xl font-semibold mt-8">Prescriptions</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {prescriptions.length > 0 ? (
                        prescriptions.map((prescription) => (
                            <div key={prescription.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                                <h4 className="font-bold text-gray-800">Doctor: {prescription.doctor_name}</h4>
                                <p className="text-sm text-gray-600">Medication: {prescription.medication}</p>
                                <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                            </div>
                        ))
                    ) : (
                        <p>No prescriptions</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-6">
                    <Link to={`edit`} className="btn btn-info text-base-100">Edit Patient</Link>
                    <button className="btn btn-error text-base-100" onClick={handleDelete}>
                        Delete Patient
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Show;
