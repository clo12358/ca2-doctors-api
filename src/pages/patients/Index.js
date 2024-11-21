const Index = () => {
    return(
        <>
        <container>
            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr> 
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Phone No.</th>
                    <th>Date of birth</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>

                <tr className="hover">
                    <td>Julia</td>
                    <td>Szew</td>
                    <td>jszew@gmail.com</td>
                    <td>0874562453</td>
                    <td>01/01/2001</td>
                    <td>Balbriggan</td>
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