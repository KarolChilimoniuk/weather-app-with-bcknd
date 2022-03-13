import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.scss';

const Form = ({appMethod, cityName}) => {
    const [userCity, changeCity] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        appMethod(userCity);
    }
    return (
        <form onSubmit={submitHandler} className={styles.form}>
               <div className={styles.labelInputContainer}>
                    <label className={styles.formLabel}>Search weather:</label>
                    <input name="weather" type="text" id="weather" placeholder="city" onChange = {(e) => changeCity(e.target.value)} className={styles.formInput} />
               </div>
               <input id={styles.submit} type="submit" value="search" className={styles.formInput}/>
        </form>
    );
}

Form.propTypes = {
    appMethod: PropTypes.func,
}

export default Form;