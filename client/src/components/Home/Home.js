import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import DailyForecast from '../DailyForecast/DailyForecast.js';
import {getLocWeatherData} from '../../apiHandling/apiHandling.js';
import {Helmet} from 'react-helmet-async';
import styles from './Home.module.scss';

const Home = ({userPosition}) => {

  const [userPositionWeather, newUserPositionWeather] = useState('');
  const [forecastInfo, newForecastInfo] = useState('');
    
  useEffect(async () => {
    if(userPosition !== 0) {
      const localWeatherData = await getLocWeatherData(userPosition.coords.latitude, userPosition.coords.longitude);
      newUserPositionWeather(localWeatherData.currentWeather);
      newForecastInfo(localWeatherData.forecastData);
    }
  }, []);
    
  return( 
    <>
      <Helmet>
        <title>Weather app by Karol Chilimoniuk</title>
        <meta
          name='description'
          content='Weather app coded by Karol Chilimoniuk with React and other technologies'
        />
        <link rel='canonical' href='/' />
      </Helmet>
      <section className={styles.container}>
        {userPositionWeather.cod === 200 && 
        <>
          <div className={styles.currentWeather}>
            <h2 className={styles.header}>Your localization</h2>
            <div className={styles.weatherDetails}>
              <p className={styles.paragraph}>You are in <span className={styles.span}>{userPositionWeather.name}</span>, <span className={styles.span}>{userPositionWeather.sys.country}</span></p>
              <div>
                <p className={styles.paragraph}>Current weather is: <span className={styles.span}>{userPositionWeather.weather[0].main}</span></p>
                <img src={`../../img/icons/${userPositionWeather.weather[0].icon}.png`}></img>
              </div>
              <p className={styles.paragraph}>Temperature: <span className={styles.span}>  {userPositionWeather.main.temp} °C</span></p>
              <p className={styles.paragraph}>Feels like: <span className={styles.span}>  {userPositionWeather.main.feels_like} °C</span></p>
              <p className={styles.paragraph}>Pressure: <span className={styles.span}>  {userPositionWeather.main.pressure} hPa</span></p>
              <p className={styles.paragraph}>Humidity: <span className={styles.span}>  {userPositionWeather.main.humidity} %</span></p>
              <p className={styles.paragraph}>Wind speed: <span className={styles.span}>  {userPositionWeather.wind.speed} km/h</span></p>
            </div>
          </div>
          {
          forecastInfo !== '' && <DailyForecast forecastInfo={forecastInfo}/>
          } 
        </>
        }
      </section>
    </>
  )
}

Home.propTypes = {
  userPosition: PropTypes.string,
}

export default Home;