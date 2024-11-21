const Index = () => {
    return(
        <>
        <container>
            <div className="max-w-2xl mx-auto">
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