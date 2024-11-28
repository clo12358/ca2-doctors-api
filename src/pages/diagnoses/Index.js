import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../utils/useAuth";
import { Link } from "react-router-dom";

const Index = () => {
    const { token } = useAuth();
    const [diagnoses, setDiagnoses] = useState(null);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

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
    }, [token]);

    if (error) return <div>{error}</div>;
    if (!diagnoses) return <div>Loading...</div>;

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
                        <th>View More</th>
                    </tr>
                </thead>
                <tbody>
                    {diagnoses.map(({ id, patient_id, condition, diagnosis_date }) => (
                        <tr key={id} className="hover">
                            <td>{patient_id}</td>
                            <td>{condition}</td>
                            <td>{diagnosis_date}</td>
                            <td>
                            <button className="btn btn-error text-base-100">Delete</button>
                            <Link to={`edit`} className="btn btn-info text-base-100">Edit Appointment</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Index;
