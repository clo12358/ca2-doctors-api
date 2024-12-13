import { useEffect, useState } from "react";
import axios from "axios";
// import { useParams, useNavigate, Link } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Show = () => {
    const { token } = useAuth();
    // const [doctor, setDoctor] = useState(null);
    const [doctorInfo, setDoctorInfo] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    // const navigate = useNavigate();

    // Appointments and Prescriptions
    const [doctorAppointments, setDoctorAppointments] = useState([])
    const [doctorPrescriptions, setDoctorPrescriptions] = useState([])

    const deleteDoctor = async (id) => {
        // User may try to run this function after a delete has happened, in which case we don't want to do anything
        if (!doctorInfo) {
            return
        }

        // Wrapping our API calls in a try/catch block means we can handle any errors that occur
        try {
            // In this first if block, we check if the doctor has any appointments or prescriptions
            // If so, we need to delete them first
            if (doctorAppointments.length > 0) {

                // Map will return our array of promises, which we can await

                // better than using forEach, because then we'd need to create an array beforehand and push to it
                const deleteAppointmentJobs = doctorAppointments.map((appointment) => {
                    return axios.delete(`https://fed-medical-clinic-api.vercel.app/appointments/${appointment.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                });

                // WAIT for all the promises to resolve before continuing
                await Promise.all(deleteAppointmentJobs);
            }

            if (doctorPrescriptions.length > 0) {
                // Once again, we iterate over the array of prescriptions, adding each delete request to an array
                // We then wait for all of them to complete before continuing
                const deletePrescriptionJobs = doctorPrescriptions.map((prescription) => {
                    return axios.delete(`https://fed-medical-clinic-api.vercel.app/prescriptions/${prescription.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                });

                await Promise.all(deletePrescriptionJobs);
            }


            // With our appointments and prescriptions deleted, we can now delete the doctor
            await axios.delete(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            console.log('Doctor deleted')

            // Clear out all our state values
            setDoctorAppointments([])
            setDoctorPrescriptions([])
            setDoctorInfo(null)

        } catch (e) {
            console.error(e)
        }
    }

    // Fetch Doctors
    const getDoctorById = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setDoctorInfo(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    // Fetch Appointments
    const getDoctorAppointments = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setDoctorAppointments(res.data.filter((appointment) => appointment.doctor_id === id));
        } catch (e) {
            console.error(e);
        }
    };

    // Fetch Prescriptions
    const getDoctorPrescriptions = async (id) => {
        try {
            const res = await axios.get(`https://fed-medical-clinic-api.vercel.app/prescriptions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setDoctorPrescriptions(res.data.filter((prescription) => prescription.doctor_id === id));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        // We can't make useEffect itself async, so we call an async function from inside it
        const fetchData = async () => {
            await getDoctorById(45);
            await getDoctorAppointments(45);
            await getDoctorPrescriptions(45);
        };

        fetchData();
    }, []);

    // // Delete
    // const handleDelete = () => {
    //     if (window.confirm("Are you sure you want to delete this doctor?")) {
    //         axios
    //             .delete(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             })
    //             .then(() => {
    //                 alert("Doctor successfully deleted.");
    //                 navigate("/doctors");
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //                 alert("Failed to delete the doctor.");
    //             });
    //     }
    // };

    // if (isLoading) return (
    //     <div
    //         role="alert"
    //         className="alert alert-warning"
    //         style={{
    //             display: 'flex',
    //             flexDirection: 'column',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             position: 'fixed',
    //             top: '50%',
    //             left: '50%',
    //             transform: 'translate(-50%, -50%)',
    //             padding: '1rem',
    //             width: '300px',
    //             textAlign: 'center',
    //             boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    //             borderRadius: '8px',
    //         }}
    //     >
    //         <span className="loading loading-infinity loading-lg"></span>
    //         <span className='font-bold'>
    //             Loading Doctor
    //         </span>
    //     </div>
    // );

    if (!doctorInfo) return (
        <div
            role="alert"
            className="alert alert-danger"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '1rem',
                width: '300px',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                backgroundColor: '#f03524',
                border: '1px solid #f5c6cb',
            }}
        >
            <span className="loading loading-infinity loading-lg text-white"></span>
            <span className='font-bold text-white'>
                You do not have authorisation, please login!
            </span>
        </div>
    );
    
    
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg border overflow-hidden">
            <div className="bg-gray-100 px-8 py-6 border-b">
                <h3 className="text-2xl font-semibold text-gray-900">Doctor Profile</h3>
                <p className="text-sm text-gray-500">Detailed information about the doctor</p>
            </div>
            <div className="p-8">
                <dl className="divide-y divide-gray-200">
                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                        <dd className="text-lg text-gray-900 col-span-2">
                            {doctorInfo.first_name} {doctorInfo.last_name}
                        </dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctorInfo.email}</dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctorInfo.phone}</dd>
                    </div>

                    <div className="py-4 grid grid-cols-3 gap-6">
                        <dt className="text-sm font-medium text-gray-500">Specialisation</dt>
                        <dd className="text-lg text-gray-900 col-span-2">{doctorInfo.specialisation}</dd>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Link to={`edit`} className="btn btn-info text-base-100">
                            Edit Doctor
                        </Link>
                        <button
                            className="btn btn-error text-base-100"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </dl>
            </div>
        </div>
    );
};

export default Show;
