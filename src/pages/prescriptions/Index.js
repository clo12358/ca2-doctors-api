import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../utils/useAuth";

const Index = () => {
    const { token } = useAuth();
    const [prescriptions, setPrescriptions] = useState(null);
    const [patients, setPatients] = useState({});
    const [diagnoses, setDiagnoses] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    const navigate = useNavigate();

    // Prescriptions
    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/prescriptions', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                // console.log(res);
                setPrescriptions(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });

            // Patients
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

            // Diagnoses
            axios.get('https://fed-medical-clinic-api.vercel.app/diagnoses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    const diagnoseMap = response.data.reduce((acc, diagnose) => {
                        acc[diagnose.id] = `${diagnose.condition}`;
                        return acc;
                    }, {});
                    setDiagnoses(diagnoseMap);
                })
                .catch(err => console.error('Error loading patients', err));
    }, [token]);

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

    if (!prescriptions) return (
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

    return(
        <div className="w-full px-4 py-6 lg:px-8">
            {/* Add New Doctor Button */}
            <div className="flex justify-end mb-4">
                <button
                    className="btn btn-success text-base-100 btn-sm"
                    onClick={() => navigate('/prescriptions/create')}
                >
                    Add New Prescription
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table w-full text-left">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Patient</th>
                            <th className="px-4 py-2">Diagnoses</th>
                            <th className="px-4 py-2">Medication</th>
                            <th className="px-4 py-2">Dosage</th>
                            <th className="px-4 py-2">View More</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {prescriptions.map(({ id, patient_id, diagnosis_id, medication, dosage }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/1097/1097905.png"
                                                    alt="Medication Avatar"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{patients[patient_id]}</div>
                                            {/* <div className="text-sm opacity-50">{last_name}</div> */}
                                        </div>
                                    </div>
                                </td>
                                {/* <td>{diagnosis_id}</td> */}
                                <td>{diagnoses[diagnosis_id]}</td>
                                <td>
                                    <span className="badge badge-ghost badge-md">
                                        {medication}
                                    </span>
                                </td>
                                <td>{dosage}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm text-base-100"
                                        onClick={() => navigate(`/prescriptions/${id}`)}
                                    >
                                        Info
                                    </button>
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
