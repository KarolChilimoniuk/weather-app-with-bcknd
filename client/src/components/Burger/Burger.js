import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Burger.module.scss';

const Burger = ({mobileHandler}) => {
    const [current, newState] = useState(styles.defaultBurger);
    const burgerHandler = () => {
      mobileHandler();
      if(current === styles.defaultBurger) {
          newState(styles.xBurger);
      } else {
          newState(styles.defaultBurger);
      }
    }
    return (
        <div className={current}
        onClick={burgerHandler}></div>
    )
}

Burger.propTypes = {
    mobileHandler: PropTypes.func,
}

export default Burger;