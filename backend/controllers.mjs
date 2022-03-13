import {getCurrentLocWeather, getForecastLocWeather, getReqWeather, getReqForecast} from './weatherFetch.mjs';

export const getLocWeatherData = async (req, res) => {
   const {lat, lon} = req.body;
   const currentWeather = await getCurrentLocWeather(lat, lon);
   const weatherForecast = await getForecastLocWeather(lat, lon);
   res.status(200).send({currentWeather: currentWeather, forecastData: weatherForecast});
}

export const getRequiredWeatherData = async (req, res) => {
   const {cityName} = req.body;
   const currentWeather = await getReqWeather(cityName);
   if(currentWeather) {
      const weatherForecast = await getReqForecast(currentWeather.coord.lat, currentWeather.coord.lon);
      res.status(200).send({currentWeather: currentWeather, forecastData: weatherForecast});
   } else {
      res.status(400).send({message: "Wrong city name. Try again."});
   }
}





