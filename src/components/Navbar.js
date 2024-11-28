import { Link } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

const Navbar = () => {
    const { token, logout } = useAuth();

    return (
        <div className="navbar bg-base-100">
            {/* Quick Links */}
            <div className="flex-1">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/doctors'>Doctors</Link></li>
                    <li><Link to='/patients'>Patients</Link></li>
                    <li><Link to='/appointments'>Appointments</Link></li>
                    <li><Link to='/diagnoses'>Diagnoses</Link></li>
                    <li><Link to='/prescriptions'>Prescriptions</Link></li>
                </ul>
            </div>

            {/* Account */}
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {token ? (
                        // If user is logged in
                        <>
                            <li>
                                <details>
                                    <summary>Chloe Dwyer</summary>
                                    <ul className="bg-base-100 rounded-t-none p-2">
                                        <li><button onClick={logout}>Logout</button></li>
                                    </ul>
                                </details>
                            </li>
                        </>
                    ) : (
                        // If user is not logged in
                        <>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
