import React, {useState, useEffect, useContext} from 'react';
import Form from '../Form/Form.js';
import DailyForecast from '../DailyForecast/DailyForecast.js';
import { getReqCityData } from '../../apiHandling/apiHandling.js';
import styles from './RequiredWeather.module.scss';

const RequiredWeather = () => {
    const [cityName, newCityName] = useState('');
    const [cityInfo, newCityInfo] = useState('');
    const [forecastInfo, newForecastInfo] = useState('');

    const fetchAppData = async () => {
      if(cityName !== '') {
        const weatherData = await getReqCityData(cityName);
        newCityInfo(weatherData.currentWeather);
        newForecastInfo(weatherData.forecastData);
      }
    }

    useEffect(()=> {
      if(cityName !== '') {
        fetchAppData();
      }
  }, [cityName]);
  
  return(
    <div className={styles.forecastContainer}>
      <Form appMethod={newCityName} cotyName={cityName}/>
        {cityInfo === "" && <p className={styles.error}>Write a city</p>}
        {cityInfo.cod !== 200 ? <p className={styles.error}>{cityInfo.message}</p> : null}
        {cityInfo.cod === 200 ? 
        <>
          <div className={styles.currentWeatherContainer}>
            <h2 className={styles.header}>Current weather</h2>
            <div className={styles.todayWeather}>
              <h3 className={styles.paragraph}>{cityInfo.name}</h3>
              <p className={styles.paragraph}>Weather: <span className={styles.span}>{cityInfo.weather[0].main}</span></p>
              <img src={`../../img/icons/${cityInfo.weather[0].icon}.png`}></img>
              <p className={styles.paragraph}>Temperature: <span className={styles.span}>{cityInfo.main.temp} °C</span></p>
              <p className={styles.paragraph}>Feels like: <span className={styles.span}>{cityInfo.main.feels_like} °C</span></p>
              <p className={styles.paragraph}>Pressure: <span className={styles.span}>{cityInfo.main.pressure} hPa</span></p>
              <p className={styles.paragraph}>Humidity: <span className={styles.span}>{cityInfo.main.humidity} %</span></p>
              <p className={styles.paragraph}>Wind speed: <span className={styles.span}>{cityInfo.wind.speed} km/h</span></p>
            </div>
          </div>
          {forecastInfo !== '' && <DailyForecast forecastInfo={forecastInfo}/> }
        </>
        : null
        }
    </div>
  )
}
 
export default RequiredWeather;