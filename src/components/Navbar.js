import { Link } from 'react-router-dom';
const Navbar = () => {

    return (
        <>
        <div className="navbar bg-base-100">

            {/* Quick Links */}
            <div className="flex-1">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/doctors'>Doctors</Link></li>
                    <li><Link to='/patients'>Patients</Link></li>
                    <li><Link to='/appointments'>Appointments</Link></li>
                </ul>
            </div>

            {/* Account */}
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li>
                    <details>
                    <summary>Chloe Dwyer</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                        <li><a>Logout</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
        </div>
        </> 
    );
};

export default Navbar;

// I got this code from https://daisyui.com/components/navbar/