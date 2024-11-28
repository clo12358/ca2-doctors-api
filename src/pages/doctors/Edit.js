import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Edit = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    // Initialize the form state with default values
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        specialisation: "",
    });

    // Fetch doctor data when the component loads
    useEffect(() => {
        axios
            .get(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("Fetched doctor data:", res.data);
                // Populate the form state with the fetched data
                setForm({
                    first_name: res.data.first_name || "",
                    last_name: res.data.last_name || "",
                    email: res.data.email || "",
                    phone: res.data.phone || "",
                    specialisation: res.data.specialisation || "",
                });
            })
            .catch((err) => {
                console.error("Error fetching doctor data:", err.response?.data || err.message);
            });
    }, [id, token]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log("Submitting form:", form);

        axios
            .put(`https://fed-medical-clinic-api.vercel.app/doctors/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log("Update successful:", res.data);
                navigate(`/doctors/${id}`, { relative: "path", replace: true });
            })
            .catch((err) => {
                console.error("Update error:", err.response?.data || err.message);
            });
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Specialisation options
    const specialisations = [
        "Podiatrist",
        "Pediatrician",
        "Dermatologist",
        "General Practitioner",
    ];

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
                    Edit Doctor
                </h2>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                {/* First Name */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="first_name"
                        id="floating_first_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        value={form.first_name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="floating_first_name" className="peer-focus:font-medium">
                        First name
                    </label>
                </div>

                {/* Last Name */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="last_name"
                        id="floating_last_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        value={form.last_name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="floating_last_name" className="peer-focus:font-medium">
                        Last name
                    </label>
                </div>
            </div>

            {/* Email */}
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="email"
                    name="email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="floating_email" className="peer-focus:font-medium">
                    Email address
                </label>
            </div>

            {/* Phone */}
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="tel"
                    name="phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="floating_phone" className="peer-focus:font-medium">
                    Phone Number
                </label>
            </div>

            {/* Specialisation */}
            <div>
                <label htmlFor="specialisation" className="peer-focus:font-medium">
                    Specialisation
                </label>
                <select
                    id="specialisation"
                    name="specialisation"
                    value={form.specialisation}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Specialisation</option>
                    {specialisations.map((spec, index) => (
                        <option key={index} value={spec}>
                            {spec}
                        </option>
                    ))}
                </select>
            </div>

            <br />
            <div className="max-w-4xl mx-auto">
                <button type="submit" className="btn btn-success text-base-100 btn-sm">
                    Update
                </button>
            </div>
        </form>
    );
};

export default Edit;
