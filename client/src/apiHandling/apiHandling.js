import axios from 'axios';

const url = `http://localhost:4000/weather/`; 

// User location weather & forecast data

export const getLocWeatherData = async(lat, lon) => {
    let weatherData;
    await axios.post(url, { lat: lat, lon: lon })
    .then(res => {
        weatherData = res.data;
    })
    .catch(err => console.log(err.message));
    return weatherData;
}

// Required city weather & forecast data

export const getReqCityData = async(cityName) => {
    let weatherData;
    await axios.post(`${url}reqWeather`, { cityName: cityName })
    .then(res => {
        weatherData = res.data;
        console.log(res.data);
    })
    .catch(err => console.log(err.message));
    return weatherData;
}

