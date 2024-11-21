import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();
    return(
        <>
        <container>
            <div className="max-w-4xl mx-auto">
                    <button className="btn btn-success text-base-100 btn-sm"
                    onClick={() => navigate('/appointments/create')}>
                    Create Appointment</button>
            </div>
            <div className="max-w-4xl mx-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr> 
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                </tr>
                </thead>
                <tbody>

                <tr className="hover">
                    <td>24/11/2024</td>
                    <td>Aoife Lynch</td>
                    <td>Julia Szew</td>
                </tr>
                </tbody>
            </table>
            </div>
        </container>
        </>       
    );
};

export default Index;

// I got this from https://daisyui.com/components/table/ 