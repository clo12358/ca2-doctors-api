const Navbar = () => {

    return (
        <>
        <div className="navbar bg-base-100">

            {/* Quick Links */}
            <div className="flex-1">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Doctors</a></li>
                    <li><a>Patients</a></li>
                    <li><a>Appointments</a></li>
                </ul>
            </div>

            {/* Account */}
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
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