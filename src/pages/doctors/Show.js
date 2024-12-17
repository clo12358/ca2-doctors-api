import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Show = () => {
    const { token } = useAuth();
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [doctorAppointments, setDoctorAppointments] = useState([]);
    const [doctorPrescriptions, setDoctorPrescriptions] = useState([]);
    const { id } = useParams();

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

    // Delete Doctor
    const deleteDoctor = async (id) => {
        if (!doctorInfo) return;

        try {
            if (doctorAppointments.length > 0) {
                const deleteAppointmentJobs = doctorAppointments.map((appointment) =>
                    axios.delete(`https://fed-medical-clinic-api.vercel.app/appointments/${appointment.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                );
                await Promise.all(deleteAppointmentJobs);
            }

            if (doctorPrescriptions.length > 0) {
                const deletePrescriptionJobs = doctorPrescriptions.map((prescription) =>
                    axios.delete(`https://fed-medical-clinic-api.vercel.app/prescriptions/${prescription.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                );
                await Promise.all(deletePrescriptionJobs);
            }

            await axios.delete(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Doctor deleted");
            setDoctorAppointments([]);
            setDoctorPrescriptions([]);
            setDoctorInfo(null);
        } catch (e) {
            console.error(e);
        }
    };

    const getDoctorById = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDoctorInfo(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const getDoctorAppointments = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/appointments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const appointments = res.data.filter((appointment) => appointment.doctor_id === parseInt(id));

            const appointmentsWithPatients = await Promise.all(
                appointments.map(async (appointment) => {
                    const patientRes = await axios.get(
                        `https://fed-medical-clinic-api.vercel.app/patients/${appointment.patient_id}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    return {
                        ...appointment,
                        patientName: `${patientRes.data.first_name} ${patientRes.data.last_name}`,
                    };
                })
            );

            setDoctorAppointments(appointmentsWithPatients);
        } catch (e) {
            console.error(e);
        }
    };

    const getDoctorPrescriptions = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const prescriptions = res.data.filter((prescription) => prescription.doctor_id === parseInt(id));


            const prescriptionsWithPatients = await Promise.all(
                prescriptions.map(async (prescription) => {
                    const patientRes = await axios.get(
                        `https://fed-medical-clinic-api.vercel.app/patients/${prescription.patient_id}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    return {
                        ...prescription,
                        patientName: `${patientRes.data.first_name} ${patientRes.data.last_name}`,
                    };
                })
            );

            setDoctorPrescriptions(prescriptionsWithPatients);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getDoctorById(id);
            await getDoctorAppointments(id);
            await getDoctorPrescriptions(id);
        };
        fetchData();
    }, [id]);

    if (!doctorInfo)
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
                <h3 className="text-2xl font-semibold text-gray-900">Doctor Profile</h3>
                <p className="text-sm text-gray-500">Detailed information about the doctor</p>
            </div>
            <div className="p-8">
                <dl className="divide-y divide-gray-200">
                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                        <dd className="text-lg text-gray-900 col-span-2">
                            {doctorInfo.first_name} {doctorInfo.last_name}
                        </dd>
                    </div>
                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctorInfo.email}</dd>
                    </div>
                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctorInfo.phone}</dd>
                    </div>
                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Specialisation</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctorInfo.specialisation}</dd>
                    </div>
                </dl>
                <h1 className="text-xl font-semibold mt-8">Appointments</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {doctorAppointments.length > 0 ? (
                        doctorAppointments.map((appointment) => (
                            <div
                                key={appointment.id}
                                className="border rounded-lg p-4 shadow-sm bg-gray-50"
                            >
                                {/* <h4 className="font-bold text-gray-800">Date: {appointment.date}</h4> */}
                                <h4 className="font-bold text-gray-800">Date: {formatDate(appointment.appointment_date)}</h4>
                                <p className="text-sm text-gray-600">Patient: {appointment.patient_name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No appointments</p>
                    )}
                </div>
                <h1 className="text-xl font-semibold mt-8">Prescriptions</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {doctorPrescriptions.length > 0 ? (
                        doctorPrescriptions.map((prescription) => (
                            <div
                                key={prescription.id}
                                className="border rounded-lg p-4 shadow-sm bg-gray-50"
                            >
                                <h4 className="font-bold text-gray-800">Patient: {prescription.patientName}</h4>
                                <p className="text-sm text-gray-600">
                                    Medication: {prescription.medication}
                                </p>
                                <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                            </div>
                        ))
                    ) : (
                        <p>No prescriptions</p>
                    )}
                </div>
                <div className="flex gap-2 pt-6">
                    <Link to={`edit`} className="btn btn-info text-base-100">
                        Edit Doctor
                    </Link>
                    <button
                        className="btn btn-error text-base-100"
                        onClick={() => {
                            if (window.confirm("Deleting will also cancel all this doctor's appointments and prescriptions. Proceed?")) {
                                deleteDoctor(id);
                            }
                        }}
                    >
                        Delete Doctor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Show;
