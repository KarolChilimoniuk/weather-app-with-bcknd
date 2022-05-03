import React, {useState, useEffect, useContext} from 'react';
import Form from '../Form/Form.js';
import DailyForecast from '../DailyForecast/DailyForecast.js';
import { getReqCityData } from '../../apiHandling/apiHandling.js';
import {Helmet} from 'react-helmet-async';
import styles from './RequiredWeather.module.scss';

const RequiredWeather = () => {
    const [cityName, newCityName] = useState('');
    const [cityInfo, newCityInfo] = useState('');
    const [forecastInfo, newForecastInfo] = useState('');

    const fetchAppData = async () => {
      if(cityName !== '') {
        const weatherData = await getReqCityData(cityName);
          if(!weatherData.message) {
            newCityInfo(weatherData.currentWeather);
            newForecastInfo(weatherData.forecastData);
          } else {
            alert(`${weatherData.message}`);
          }
      }
    }

    useEffect(()=> {
      if(cityName !== '') {
        fetchAppData();
      }
  }, [cityName]);
  
  return(
    <>
      <Helmet>
        <title>Weather app by Karol Chilimoniuk</title>
        <meta
          name='description'
          content='Weather app coded by Karol Chilimoniuk with React and other technologies'
        />
        <link rel='canonical' href='/requiredForecast' />
      </Helmet>
      <section className={styles.forecastContainer}>
      <Form appMethod={newCityName} cityName={cityName}/>
        {cityInfo === "" && <p className={styles.error}>Write a city</p>}
        {cityInfo.cod !== 200 ? <p className={styles.error}>{cityInfo.message}</p> : null}
        {cityInfo.cod === 200 ? 
        <>
          <div className={styles.currentWeatherContainer}>
            <h2 className={styles.header}>Current weather</h2>
            <div className={styles.todayWeather}>
              <h3 className={styles.paragraph}>{cityInfo.name}</h3>
              <img className={styles.icon} src={`http://openweathermap.org/img/wn/${cityInfo.weather[0].icon}@2x.png`}/>
              <p className={styles.paragraph}>Weather: <span className={styles.span}>{cityInfo.weather[0].description}</span></p>
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
    </section>
    </>
  )
}
 
export default RequiredWeather;