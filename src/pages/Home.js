import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=53.29494514181048&lon=-6.142677530050762&appid=aab2ff189d9e140ba0bdf7dc2ca63c97`)
            .then((response) => {
                console.log(response.data);
                setWeatherInfo(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!weatherInfo) {
        return <div>Loading...</div>;
    }

    // Getting Icon
    const iconCode = weatherInfo.weather[0].icon;

    // Icon UrRL
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Date
    const timestamp = weatherInfo.dt;
    const date = new Date(timestamp * 1000);
    const simpleDate = date.toDateString();

    // Temperature
    const kelvin = weatherInfo.main.temp;
    const celsius = kelvin - 273.15;

    return(
        <>
        <div className="flex flex-col items-center p-8 rounded-md w-60 sm:px-12 dark:bg-gray-50 dark:text-gray-800">
            <div className="text-center">
                <h2 className="text-xl font-semibold">{weatherInfo.name}</h2>
                <p className="text-sm dark:text-gray-600">{simpleDate}</p>
            </div>
            <img src={iconUrl} alt={weatherInfo.weather[0].description} className="w-24 h-24" />
            <div className="mb-2 text-3xl font-semibold">
                {celsius.toFixed(0)}°C
            </div>
            <p className="dark:text-gray-600">{weatherInfo.weather[0].description}</p>
        </div>
        </>
    );
};

export default Home;