import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Create = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        appointment_date: "",
        doctor_id: "",
        patient_id: "",
    });

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorRes = await axios.get("https://fed-medical-clinic-api.vercel.app/doctors", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(doctorRes.data);

                const patientRes = await axios.get("https://fed-medical-clinic-api.vercel.app/patients", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatients(patientRes.data);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching doctors or patients:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const appointmentData = {
            ...form,
            doctor_id: parseInt(form.doctor_id, 10),
            patient_id: parseInt(form.patient_id, 10),
        };

        axios
            .post("https://fed-medical-clinic-api.vercel.app/appointments", appointmentData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log("Appointment created successfully:", res.data);
                navigate("/appointments");
            })
            .catch((err) => {
                console.error("Error creating appointment:", err.response);
                alert(`Error: ${err.response?.data?.message || "Something went wrong!"}`);
            });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) return <div>Loading doctors and patients...</div>;

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
                Create Appointment
            </h2>

            {/* Appointment Date */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">
                    Appointment Date
                </label>
                <input
                    type="date"
                    name="appointment_date"
                    value={form.appointment_date}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            {/* Doctors Dropdown */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">
                    Doctor
                </label>
                <select
                    name="doctor_id"
                    value={form.doctor_id}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select a Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.first_name} {doctor.last_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Patients Dropdown */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">
                    Patient
                </label>
                <select
                    name="patient_id"
                    value={form.patient_id}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select a Patient</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.first_name} {patient.last_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="btn btn-success text-base-100 btn-sm"
                >
                    Create Appointment
                </button>
            </div>
        </form>
    );
};

export default Create;
