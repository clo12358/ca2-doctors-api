import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';

const LoginForm = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        login(form.email, form.password);
        navigate('/');
    };

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);  // Debugging
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5 text-center">
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="example@example.com"
                            onChange={handleChange} 
                            value={form.email}
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
                            type="password"
                            id="password"
                            name="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleChange} 
                            value={form.password}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-active btn-primary w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
