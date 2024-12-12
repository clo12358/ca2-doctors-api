import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Show = () => {
    const { token } = useAuth();
    const [prescription, setPrescription] = useState(null);
    const [patientName, setPatientName] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [diagnoses, setDiagnoses] = useState("");
    const { id } = useParams();

    useEffect(() => {
        // Fetch the prescription
        axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setPrescription(res.data);
                const { patient_id, doctor_id, diagnosis_id } = res.data;

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

                // Diagnoses
                axios.get(`https://fed-medical-clinic-api.vercel.app/diagnoses/${diagnosis_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((diagnosesRes) => {
                        setDiagnoses(`${diagnosesRes.data.condition}`);
                    })
                    .catch((err) => console.error("Error loading diagnoses:", err));

            })
            .catch((err) => console.error("Error loading prescription:", err));
    }, [id, token]);

    if (!prescription) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Prescription</h3>
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

                    {/* Diagnoses */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Diagnoses</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{diagnoses || "Loading..."}</dd>
                        </dd>
                    </div>

                    {/* Medication */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Medication</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{prescription.medication}</dd>
                    </div>

                    {/* Dosage */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Dosage</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{prescription.dosage}</dd>
                    </div>

                    {/* Start Date */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{prescription.start_date}</dd>
                    </div>

                    {/* End Date */}
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">End Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{prescription.end_date}</dd>
                    </div>

                    {/* Action Buttons */}
                    <button className="btn btn-error text-base-100">Delete</button>
                    <Link to={`edit`} className="btn btn-info text-base-100">Edit Prescription</Link>
                </dl>
            </div>
        </div>
    );
};

export default Show;
