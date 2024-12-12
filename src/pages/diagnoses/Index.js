import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../utils/useAuth";
import { Link } from "react-router-dom";

const Index = () => {
    const { token } = useAuth();
    const [diagnoses, setDiagnoses] = useState(null);
    const [patients, setPatients] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch Diagnoses and Patients
    useEffect(() => {
        // Fetch Diagnoses
        axios.get('https://fed-medical-clinic-api.vercel.app/diagnoses', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setDiagnoses(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching diagnoses", err);
            });

        // Fetch Patients
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

    // Delete diagnoses function
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this diagnoses?")) {
            axios
                .delete(`https://fed-medical-clinic-api.vercel.app/diagnoses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log("Diagnoses deleted successfully", response);
                    setDiagnoses(diagnoses.filter((diagnosis) => diagnosis.id !== id));
                    alert("Diagnosis successfully deleted.");
                })
                .catch((err) => {
                    console.error("Error deleting diagnosis", err);
                    alert("Failed to delete the diagnosis.");
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
                Loading Diagnoses
            </span>
        </div>
    );

    if (!diagnoses) return (
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
            {/* Add New Diagnoses Button */}
            <div className="flex justify-end mb-4">
                <button
                    className="btn btn-success text-base-100 btn-sm"
                    onClick={() => navigate('/diagnoses/create')}
                >
                    Add New Diagnoses
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table w-full text-left">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Patient</th>
                            <th className="px-4 py-2">Condition</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {diagnoses.map(({ id, patient_id, condition, diagnosis_date }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/2117/2117031.png"
                                                    alt="Diagnoses Avatar"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{patients[patient_id]}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-md">
                                        {condition}
                                    </span>
                                </td>
                                <td>{diagnosis_date}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button
                                        className="btn btn-error btn-sm text-base-100"
                                        onClick={() => handleDelete(id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`edit`} className="btn btn-info btn-sm text-base-100">
                                        Edit Diagnose
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
