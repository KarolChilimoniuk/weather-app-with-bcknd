import React, { useEffect, useState, useContext } from "react";
import moment from 'moment';
import { PositionContext } from "../../App.js";
import DailyForecast from "../DailyForecast/DailyForecast.js";
import { getLocWeatherData } from "../../apiHandling/apiHandling.js";
import { Helmet } from "react-helmet-async";
import styles from "./Home.module.scss";

const Home = () => {
  const userPosition = useContext(PositionContext);
  const [userPositionWeather, newUserPositionWeather] = useState("");
  const [forecastInfo, newForecastInfo] = useState("");
  const [isLoading, setLoading] = useState(true);

  const fetchAppData = async () => {
    const localWeatherData = await getLocWeatherData(
      userPosition.coords.latitude,
      userPosition.coords.longitude
    );
    newUserPositionWeather(localWeatherData.currentWeather);
    newForecastInfo(localWeatherData.forecastData);
    setLoading(false);
  };

  useEffect(() => {
    if (userPosition !== 0) {
      fetchAppData();
    }
  }, [userPosition]);

  return (
    <>
      <Helmet>
        <title>Weather app by Karol Chilimoniuk</title>
        <meta
          name="description"
          content="Weather app coded by Karol Chilimoniuk with React and other technologies"
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <section className={styles.container}>
        {isLoading && <h3 className={styles.loading}>... Loading</h3>}
        {isLoading === false && (
          <>
            <div className={styles.currentWeather}>
              <h2 className={styles.header}>Your localization</h2>
              <div className={styles.weatherDetails}>
                <p className={styles.paragraph}>
                  You are in{" "}
                  <span className={styles.span}>
                    {userPositionWeather.name}
                  </span>
                  ,{" "}
                  <span className={styles.span}>
                    {userPositionWeather.sys.country}
                  </span>
                </p>
                <p className={styles.paragraph}>Day:{" "}
                  <span className={styles.span}>
                  {moment().format('dddd')}{", "}{moment().format('MMMM Do YYYY')}
                  </span>
                </p>
                <img
                  className={styles.icon}
                  src={`http://openweathermap.org/img/wn/${userPositionWeather.weather[0].icon}@2x.png`}
                />
                <p className={styles.paragraph}>
                  Current weather is:{" "}
                  <span className={styles.span}>
                    {userPositionWeather.weather[0].description}
                  </span>
                </p>
                <p className={styles.paragraph}>Sunrise:{" "}
                  <span className={styles.span}>
                     {moment(userPositionWeather.sys.sunrise * 1000).calendar()}
                  </span>
                </p>
                <p className={styles.paragraph}>Sunset:{" "}
                  <span className={styles.span}>
                     {moment(userPositionWeather.sys.sunset * 1000).calendar()}
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Temperature:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.main.temp} °C
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Feels like:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.main.feels_like} °C
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Pressure:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.main.pressure} hPa
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Humidity:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.main.humidity} %
                  </span>
                </p>
                <p className={styles.paragraph}>
                  Wind speed:{" "}
                  <span className={styles.span}>
                    {" "}
                    {userPositionWeather.wind.speed} km/h
                  </span>
                </p>
              </div>
            </div>
            {forecastInfo !== "" && (
              <DailyForecast forecastInfo={forecastInfo} />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
