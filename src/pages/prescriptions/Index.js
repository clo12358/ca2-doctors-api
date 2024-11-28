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
        <>
            <div className="max-w-4xl mx-auto">
                <button className="btn btn-success text-base-100 btn-sm"
                onClick={() => navigate('/prescriptions/create')}>
                Create Prescriptions</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Patient </th>
                        <th>Diagnoses</th>
                        <th>Medication</th>
                        <th>Dosage</th>
                        <th>View More</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map(({ id, patient_id, diagnosis_id, medication, dosage }) => (
                        <tr key={id} className="hover">
                            <td>{patient_id}</td>
                            <td>{diagnosis_id}</td>
                            <td>{medication}</td>
                            <td>{dosage}</td>
                            <td>
                            <button 
                                className="btn btn-info btn-sm text-base-100" 
                                onClick={() => navigate(`/prescriptions/${id}`)}>
                                Info
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Index;
