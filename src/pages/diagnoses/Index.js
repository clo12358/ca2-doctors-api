import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../utils/useAuth";
// import { Link } from "react-router-dom";

const Index = () => {
    const { token } = useAuth();
    const [diagnoses, setDiagnoses] = useState(null);
    const [patients, setPatients] = useState({});
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();


    // Diagnoses
    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/diagnoses', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
                setDiagnoses(response.data);
            })
            .catch(err => {
                console.error(err);
                setError('Error loading prescriptions');
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
    }, [token]);

    if (error) return <div>{error}</div>;
    if (!diagnoses) return <div>Loading...</div>;

    return(
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

            {/* Responsive Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table w-full text-left">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Patient</th>
                            <th className="px-4 py-2">Condition</th>
                            <th className="px-4 py-2">Date</th>
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
                                            {/* <div className="text-sm opacity-50">{last_name}</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-md">
                                        {condition}
                                    </span>
                                </td>
                                <td>{diagnosis_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Index;
