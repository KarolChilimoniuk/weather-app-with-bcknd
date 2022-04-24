import React, {useEffect, useState, useContext} from 'react';
import {UserLocContext} from '../../App.js';
import DailyForecast from '../DailyForecast/DailyForecast.js';
import {getLocWeatherData} from '../../apiHandling/apiHandling.js';
import styles from './Home.module.scss';

const Home = () => {

  const [userPositionWeather, newUserPositionWeather] = useState('');
  const [forecastInfo, newForecastInfo] = useState('');
  const [isLoading, setLoading] = useState(false);

  const userPosition = useContext(UserLocContext);

  const handleData = async() => {
    const localWeatherData = await getLocWeatherData(userPosition.coords.latitude, userPosition.coords.longitude);
    setLoading(true);
    newUserPositionWeather(localWeatherData.currentWeather);
    newForecastInfo(localWeatherData.forecastData);
    setLoading(false);
  }
  
  useEffect(() => {
    if(userPosition !== 0) {
      handleData();
    }
  }, [userPosition]);
    
  return( 
    <>
      <section className={styles.container}>
        {isLoading && <h2 className={styles.header}>...Loading</h2>}
        {userPositionWeather.cod === 200 && 
        <>
          <div className={styles.currentWeather}>
            <h2 className={styles.header}>Your localization</h2>
            <div className={styles.weatherDetails}>
              <p className={styles.paragraph}>You are in <span className={styles.span}>{userPositionWeather.name}</span>, <span className={styles.span}>{userPositionWeather.sys.country}</span></p>
              <img className={styles.icon} src={`http://openweathermap.org/img/wn/${userPositionWeather.weather[0].icon}@2x.png`} alt="weather icon"/>
              <div>
                <p className={styles.paragraph}>Current weather is: <span className={styles.span}>{userPositionWeather.weather[0].main}</span></p>
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

export default Home;