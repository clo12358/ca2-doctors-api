const Index = () => {
    return(
        <>
        <container>
            <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr> 
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Specialisation</th>
                </tr>
                </thead>
                <tbody>

                <tr className="hover">
                    <td>Aoife</td>
                    <td>Lynch</td>
                    <td>alynch@gmail.com</td>
                    <td>0873452765</td>
                    <td>Podiatrist</td>
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