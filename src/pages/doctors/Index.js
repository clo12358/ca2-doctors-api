import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [doctors, setDoctors] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fed-medical-clinic-api.vercel.app/doctors')
            .then(response => {
                console.log(response.data);
                setDoctors(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    if (!doctors) return 'Loading...';

    return (
        <>
            <container>
                <div className="max-w-4xl mx-auto">
                    <button className="btn btn-success text-base-100 btn-sm">Add new Doctor</button>
                </div>
                <div className="max-w-4xl mx-auto">
                    <table className="table">
                        {/* Head section */}
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Specialisation</th>
                                <th>View More</th>
                            </tr>
                        </thead>

                        {/* Body section */}
                        <tbody>
                            {doctors.map(({ _id, first_name, last_name, email, phone, specialisation }) => (
                                <tr key={_id} className="hover">
                                    <td>{first_name}</td>
                                    <td>{last_name}</td>
                                    <td>{specialisation}</td>
                                    <td>
                                        <button 
                                            className="btn btn-info btn-sm text-base-100" 
                                            onClick={() => navigate('/doctors/id')}>
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