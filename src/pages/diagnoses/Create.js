import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Create = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        patient_id: "",
        condition: "",
        diagnosis_date: "",
    });

    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch patients from the API
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("https://fed-medical-clinic-api.vercel.app/patients", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatients(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching patients:", error);
                setIsLoading(false);
            }
        };

        fetchPatients();
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const diagnosisData = {
            ...form,
            patient_id: parseInt(form.patient_id, 10),
        };

        axios
            .post("https://fed-medical-clinic-api.vercel.app/diagnoses", diagnosisData, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log("Diagnosis created successfully:", res.data);
                navigate("/diagnoses"); // Navigate to the diagnoses index page
            })
            .catch((err) => {
                console.error("Error creating diagnosis:", err);
                alert(`Error: ${err.response?.data?.message || "Something went wrong!"}`);
            });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) return <div>Loading patients...</div>;

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">Add new diagnosis</h2>

            {/* Diagnosis Date */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-500">Diagnosis Date</label>
                <input
                    type="date"
                    name="diagnosis_date"
                    value={form.diagnosis_date}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>

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

            {/* Condition */}
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="condition"
                    id="floating_condition"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={form.condition}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="floating_condition"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Condition
                </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button type="submit" className="btn btn-success text-base-100 btn-sm">
                    Add new diagnosis
                </button>
            </div>
        </form>
    );
};

export default Create;