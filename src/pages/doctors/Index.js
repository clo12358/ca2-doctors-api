import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [doctors, setDoctors] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('https://fed-medical-clinic-api.vercel.app/doctors')
            .then((response) => {
                console.log(response.data);
                setDoctors(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!doctors) return 'Loading...';

    return (
        <div className="w-full px-4 py-6 lg:px-8">
            {/* Add New Doctor Button */}
            <div className="flex justify-end mb-4">
                <button
                    className="btn btn-success text-base-100 btn-sm"
                    onClick={() => navigate('/doctors/create')}
                >
                    Add New Doctor
                </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table w-full text-left">
                    {/* Table Head */}
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Specialisation</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">View More</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {doctors.map(({ id, first_name, last_name, phone, specialisation }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                                                    alt="Doctor Avatar"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{first_name}</div>
                                            <div className="text-sm opacity-50">{last_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-ghost badge-md">
                                        {specialisation}
                                    </span>
                                </td>
                                <td>{phone}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm text-base-100"
                                        onClick={() => navigate(`/doctors/${id}`)}
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

// https://daisyui.com/components/table/