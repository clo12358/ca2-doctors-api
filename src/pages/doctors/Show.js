import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Show = () => {
    const { token } = useAuth();
    const [doctor, setDoctor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch doctor details
    useEffect(() => {
        axios
            .get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setDoctor(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to fetch doctor details. Please try again.");
                setIsLoading(false);
            });
    }, [id, token]);

    // Delete
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            axios
                .delete(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    alert("Doctor successfully deleted.");
                    navigate("/doctors");
                })
                .catch((err) => {
                    console.error(err);
                    alert("Failed to delete the doctor.");
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
                Loading Doctor
            </span>
        </div>
    );

    if (!doctor) return (
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
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg border overflow-hidden">
            <div className="bg-gray-100 px-8 py-6 border-b">
                <h3 className="text-2xl font-semibold text-gray-900">Doctor Profile</h3>
                <p className="text-sm text-gray-500">Detailed information about the doctor</p>
            </div>
            <div className="p-8">
                <dl className="divide-y divide-gray-200">
                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                        <dd className="text-lg text-gray-900 col-span-2">
                            {doctor.first_name} {doctor.last_name}
                        </dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctor.email}</dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctor.phone}</dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Specialisation</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctor.specialisation}</dd>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Link to={`edit`} className="btn btn-info text-base-100">
                            Edit Doctor
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
