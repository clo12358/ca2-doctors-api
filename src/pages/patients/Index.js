import { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
    const [patients, setPatients] = useState(null);

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
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* Head section */}
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th>Date of birth</th>
                                <th>Address</th>
                            </tr>
                        </thead>

                        {/* Body section */}
                        <tbody>
                            {patients.map(({ _id, first_name, last_name, email, phone, date_of_birth, address }) => (
                                <tr key={_id} className="hover">
                                    <td>{first_name}</td>
                                    <td>{last_name}</td>
                                    <td>{email}</td>
                                    <td>{phone}</td>
                                    <td>{date_of_birth}</td>
                                    <td>{address}</td>
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