import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [patients, setPatients] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/patients')
            .then(response => {
                console.log(response.data);
                setPatients(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (!patients) return 'Loading...';

    return (
        <>
            <container>
                <div className="max-w-4xl mx-auto">
                        <button className="btn btn-success text-base-100 btn-sm"
                        onClick={() => navigate('/patients/create')}>
                            Add new patient</button>
                </div>
                <div className="max-w-4xl mx-auto">
                    <table className="table">
                        {/* Head section */}
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Info</th>
                            </tr>
                        </thead>

                        {/* Body section */}
                        <tbody>
                            {patients.map(({ id, first_name, last_name, email, phone, date_of_birth, address }) => (
                                <tr key={id} className="hover">
                                    <td>{first_name}</td>
                                    <td>{last_name}</td>
                                    <td>{email}</td>
                                    <td>
                                        <button 
                                            className="btn btn-info btn-sm text-base-100" 
                                            onClick={() => navigate(`/patients/${id}`)}>
                                            Info
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </container>
        </>
    );
};

export default Index;

// I got this from https://daisyui.com/components/table/ 