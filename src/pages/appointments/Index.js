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
    }, [token]);

    if (error) return <div>{error}</div>;
    if (!appointments) return <div>Loading...</div>;

    return(
        <>
        <div className="w-full px-4 py-6 lg:px-8">
            {/* Create Appointment Button */}
            <div className="flex justify-end mb-4">
                <button
                    className="btn btn-success text-base-100 btn-sm"
                    onClick={() => navigate('/appointments/create')}
                >
                    Create Appointment
                </button>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table w-full text-left">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Appointment Date</th>
                            <th className="px-4 py-2">Doctor</th>
                            <th className="px-4 py-2">Patient</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(({ id, appointment_date, doctor_id, patient_id }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://icons.veryicon.com/png/o/miscellaneous/icon-library-of-x-bacteria/appointment-4.png"
                                                    alt="Appointment"
                                                />
                                            </div>
                                        </div>
                                        <div>{appointment_date}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{doctor_id}</td>
                                <td className="px-4 py-3">{patient_id}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button className="btn btn-error btn-sm text-base-100">
                                        Delete
                                    </button>
                                    <Link to={`edit`} className="btn btn-info btn-sm text-base-100">
                                        Edit Appointment
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

            
        </>
    );
};

export default Index;
