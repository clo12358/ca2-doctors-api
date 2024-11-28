import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Show = () => {

    const { token } = useAuth();
    const [patient, setPatient] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/patients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res);
                setPatient(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token]);

    return patient && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg border overflow-hidden">
        <div className="bg-gray-100 px-8 py-6 border-b">
            <h3 className="text-2xl font-semibold text-gray-900">Patient Profile</h3>
            <p className="text-sm text-gray-500">Detailed information about the patient</p>
        </div>
        
        <div className="p-8">
            <dl className="divide-y divide-gray-200">
                <div className="py-4 grid grid-cols-3 gap-6">
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="text-lg text-gray-900 col-span-2">{patient.first_name} {patient.last_name}</dd>
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
                    <Link to={`edit`} className="btn btn-info text-base-100">Edit patient</Link>
                    <button className="btn btn-error text-base-100">Delete</button>
                </div>
            </dl>
        </div>
    </div>
    );
}

export default Show;

// I got this from https://tailwindflex.com/@lucas-m/show-user-details