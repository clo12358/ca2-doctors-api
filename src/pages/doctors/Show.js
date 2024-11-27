import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Show = () => {
    const { token } = useAuth();
    const [doctor, setDoctor] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log(res);
                setDoctor(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token]);

    return doctor && (
        <div className="max-w-4xl mx-auto">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Doctor Profile
                </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            First name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doctor.first_name}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Last name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doctor.last_name}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doctor.email}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doctor.phone}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Specialisation
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {doctor.specialisation}
                        </dd>
                    </div>
                    <button className="btn btn-error text-base-100">Delete</button>
                </dl>
            </div>
        </div>
    );
};

export default Show;
