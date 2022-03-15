import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {DayContext, dayNames} from '../../App.js';
import styles from './DailyForecast.module.scss';

const DailyForecast = ({forecastInfo}) => {
    const [forecastDays, newDaysToUse] = useState([]);

    const dayNamesHandler = (dayNumber, dayNames) => {
        const daysToUse = [];
        for(let i = dayNumber + 1; i < dayNames.length; i++) {
            if(i === 6) {
                daysToUse.push(dayNames[i]);
                i = 0;
                daysToUse.push(dayNames[i]);
                continue;
            }
            if(daysToUse.length === 8) {
                break;
            }
            daysToUse.push(dayNames[i]);
        }
        newDaysToUse(daysToUse);
    }
    const dayNumber = useContext(DayContext);

    useEffect(() => {
       dayNamesHandler(dayNumber, dayNames);
    }, [forecastInfo]);

    return (
        <section className={styles.dailyForecastContainer}>
            <h2 className={styles.header}>8 days forecast</h2>
            <div className={styles.weekDailyForecast}>
           {forecastInfo !== undefined && forecastInfo !== null ? forecastInfo.daily.map((el,i,arr) => 
               <div className={styles.dayForecast}>
                    <h3 className={styles.secondHeader}>{forecastDays[i]}</h3>
                    <p className={styles.paragraph}>Temperature: <span className={styles.span}>{el.temp.day} °C</span></p>
                    <p className={styles.paragraph}>Pressure: <span className={styles.span}>{el.pressure} hPa </span></p>
                    <p className={styles.paragraph}>Humidity: <span className={styles.span}>{el.humidity} % </span></p>
                    <p className={styles.paragraph}>Wind speed: <span className={styles.span}>{el.wind_speed} km/h</span></p>
                </div>
            ) : null} 
            </div>
        </section>
    )
}

DailyForecast.propTypes = {
    forecastInfo: PropTypes.string,
}

export default DailyForecast;