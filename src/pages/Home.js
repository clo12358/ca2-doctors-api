import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=53.29494514181048&lon=-6.142677530050762&appid=aab2ff189d9e140ba0bdf7dc2ca63c97`)
            .then((response) => {
                setWeatherInfo(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get('https://fed-medical-clinic-api.vercel.app/doctors')
            .then((response) => setDoctors(response.data))
            .catch((err) => console.log(err));

        axios
            .get('https://fed-medical-clinic-api.vercel.app/patients')
            .then((response) => setPatients(response.data))
            .catch((err) => console.log(err));
    }, []);

    if (!weatherInfo) {
        return <div>Loading...</div>;
    }

    const iconCode = weatherInfo.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const timestamp = weatherInfo.dt;
    const date = new Date(timestamp * 1000);
    const simpleDate = date.toDateString();

    const kelvin = weatherInfo.main.temp;
    const celsius = kelvin - 273.15;

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-6 sm:px-12">
            <div className="max-w-screen-xl mx-auto">
                {/* Weather Card */}
                <div className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-xl p-6 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{weatherInfo.name}</h2>
                            <p className="text-lg">{simpleDate}</p>
                        </div>
                        <img src={iconUrl} alt={weatherInfo.weather[0].description} className="w-16 h-16" />
                    </div>
                    <div className="mt-4">
                        <p className="text-4xl font-semibold">{celsius.toFixed(0)}°C</p>
                        <p className="text-xl">{weatherInfo.weather[0].description}</p>
                    </div>
                </div>

                {/* Doctors Section */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Doctors</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.length > 0 ? (
                            doctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold text-gray-800">
                                            {doctor.first_name} {doctor.last_name}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-2">Specialisation: {doctor.specialisation}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No doctors available</p>
                        )}
                    </div>
                </div>

                {/* Patients Section */}
                <div className="mt-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Patients</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {patients.length > 0 ? (
                            patients.map((patient) => (
                                <div
                                    key={patient.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="p-6">
                                        <h4 className="text-xl font-semibold text-gray-800">
                                            {patient.first_name} {patient.last_name}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-2">Phone: {patient.phone}</p>
                                        <p className="text-sm text-gray-600 mt-2">Email: {patient.email}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No patients available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
