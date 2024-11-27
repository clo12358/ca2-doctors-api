import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // State for the form
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });

    // State for error messages
    const [error, setError] = useState(null);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Client-side validation
        if (!form.first_name || !form.last_name || !form.email || !form.password) {
            setError('All fields are required.');
            return;
        }
        if (!form.email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        // Clear error state before submitting
        setError(null);

        // Submit form data
        axios
            .post(`https://fed-medical-clinic-api.vercel.app/register`, form)
            .then((res) => {
                console.log('Response:', res);

                // Store user data in local storage
                localStorage.setItem('user', JSON.stringify(res.data.user));

                // Log the user in and navigate to the home page
                login(form.email, form.password);
                navigate('/');
            })
            .catch((err) => {
                console.error('Error:', err.response?.data || err.message);
                setError(
                    err.response?.data?.message || 'An error occurred during registration.'
                );
            });
    };

    // Handle form input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5 text-center">
                    Register an Account
                </h2>
                {error && (
                    <div className="mb-4 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            First Name
                        </label>
                        <input
                            onChange={handleChange}
                            name="first_name"
                            value={form.first_name}
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="last_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Last Name
                        </label>
                        <input
                            onChange={handleChange}
                            name="last_name"
                            value={form.last_name}
                            type="text"
                            id="last_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            name="email"
                            value={form.email}
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            name="password"
                            value={form.password}
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-active btn-primary w-full"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
