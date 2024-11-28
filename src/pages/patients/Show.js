import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Show = () => {
    const { token } = useAuth();
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch patient details
    useEffect(() => {
        axios
            .get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setPatient(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to fetch patient details. Please try again.");
                setIsLoading(false);
            });
    }, [id, token]);

    // Delete patient
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            axios
                .delete(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    alert("Patient successfully deleted.");
                    navigate("/patients");
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to delete the patient.");
                });
        }
    };

    if (isLoading) {
        return <p>Loading patient details...</p>;
    }

    if (!patient) {
        return <p>Patient not found or has been deleted.</p>;
    }

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

                    <div className="flex gap-2 pt-2">
                        <Link to={`edit`} className="btn btn-info text-base-100">
                            Edit Patient
                        </Link>
                        <button
                            className="btn btn-error text-base-100"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default Show;
