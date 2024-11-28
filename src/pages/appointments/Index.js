import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../utils/useAuth";
import { Link } from "react-router-dom";

const Index = () => {
    const { token } = useAuth();
    const [appointments, setAppointments] = useState(null);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/appointments', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
                setAppointments(response.data);
            })
            .catch(err => {
                console.error(err);
                setError('Error loading appointments');
            });
    }, []);

    if (error) return <div>{error}</div>;
    if (!appointments) return <div>Loading...</div>;

    return(
        <>
            <div className="max-w-4xl mx-auto">
                <button className="btn btn-success text-base-100 btn-sm"
                onClick={() => navigate('/appointments/create')}>
                Create Appointment</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Appointment Date</th>
                        <th>Doctor</th>
                        <th>Patient</th>
                        <th>View More</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(({ id, appointment_date, doctor_id, patient_id }) => (
                        <tr key={id} className="hover">
                            <td>{appointment_date}</td>
                            <td>{doctor_id}</td>
                            <td>{patient_id}</td>
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
