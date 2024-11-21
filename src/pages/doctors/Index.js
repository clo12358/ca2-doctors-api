import { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
    const [doctors, setDoctors] = useState(null);

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
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* Head section */}
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone No.</th>
                                <th>Specialisation</th>
                            </tr>
                        </thead>

                        {/* Body section */}
                        <tbody>
                            {doctors.map(({ _id, first_name, last_name, email, phone, specialisation }) => (
                                <tr key={_id} className="hover">
                                    <td>{first_name}</td>
                                    <td>{last_name}</td>
                                    <td>{email}</td>
                                    <td>{phone}</td>
                                    <td>{specialisation}</td>
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