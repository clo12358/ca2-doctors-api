import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../utils/useAuth";

const Index = () => {
    const { token } = useAuth();
    const [prescriptions, setPrescriptions] = useState(null);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/prescriptions', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
                setPrescriptions(response.data);
            })
            .catch(err => {
                console.error(err);
                setError('Error loading prescriptions');
            });
    }, [token]);

    if (error) return <div>{error}</div>;
    if (!prescriptions) return <div>Loading...</div>;

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

            {/* Responsive Table */}
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
                                            <div className="font-bold">{patient_id}</div>
                                            {/* <div className="text-sm opacity-50">{last_name}</div> */}
                                        </div>
                                    </div>
                                </td>
                                <td>{diagnosis_id}</td>
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
