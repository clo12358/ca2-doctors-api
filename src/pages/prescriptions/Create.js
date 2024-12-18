import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const CreatePrescription = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        patient_id: "",
        doctor_id: "",
        diagnosis_id: "",
        medication: "",
        dosage: "",
        start_date: "",
        end_date: "",
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch patients, doctors, and diagnoses
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch patients
                const patientRes = await axios.get("https://fed-medical-clinic-api.vercel.app/patients", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatients(patientRes.data);

                // Fetch doctors
                const doctorRes = await axios.get("https://fed-medical-clinic-api.vercel.app/doctors", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(doctorRes.data);

                // Fetch diagnoses
                const diagnosisRes = await axios.get("https://fed-medical-clinic-api.vercel.app/diagnoses", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDiagnoses(diagnosisRes.data);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Parse IDs as integers to prevent 422 errors
        const prescriptionData = {
            ...form,
            patient_id: parseInt(form.patient_id, 10),
            doctor_id: parseInt(form.doctor_id, 10),
            diagnosis_id: parseInt(form.diagnosis_id, 10),
        };

        axios
            .post("https://fed-medical-clinic-api.vercel.app/prescriptions", prescriptionData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log("Prescription created successfully:", res.data);
                navigate("/prescriptions"); // Navigate to the prescriptions index page
            })
            .catch((err) => {
                console.error("Error creating prescription:", err);
                alert(`Error: ${err.response?.data?.message || "Something went wrong!"}`);
            });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) return <div>Loading patients, doctors, and diagnoses...</div>;

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">Create Prescription</h2>

            {/* Patient Dropdown */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">Patient</label>
                <select
                    name="patient_id"
                    value={form.patient_id}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                            {patient.first_name} {patient.last_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Doctor Dropdown */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">Doctor</label>
                <select
                    name="doctor_id"
                    value={form.doctor_id}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.first_name} {doctor.last_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Diagnosis Dropdown */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">Diagnosis</label>
                <select
                    name="diagnosis_id"
                    value={form.diagnosis_id}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select Diagnosis</option>
                    {diagnoses.map((diagnosis) => (
                        <option key={diagnosis.id} value={diagnosis.id}>
                            {diagnosis.condition}
                        </option>
                    ))}
                </select>
            </div>

            {/* Medication */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">Medication</label>
                <input
                    type="text"
                    name="medication"
                    value={form.medication}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            {/* Dosage */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">Dosage</label>
                <input
                    type="text"
                    name="dosage"
                    value={form.dosage}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            {/* Start Date */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">Start Date</label>
                <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            {/* End Date */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">End Date</label>
                <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button type="submit" className="btn btn-success text-base-100 btn-sm">
                    Create Prescription
                </button>
            </div>
        </form>
    );
};

export default CreatePrescription;
