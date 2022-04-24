import React, {useState, useEffect, createContext} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './components/Home/Home.js';
import RequiredWeather from './components/RequiredWeather/RequiredWeather.js';
import Nav from './components/Nav/Nav.js';
import Footer from './components/Footer/Footer.js';
import './App.scss';
export const UserLocContext = createContext(0);
export const DayContext = React.createContext(null);
export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const wind = window;

const App = () => {
  const [userPositionData, newUserPosition] = useState(0);
  const [dayNumber, setDayNumber] = useState('');
  const successCallback = userPos => {newUserPosition(userPos); console.log("I've got your localization data :]")};
  const failureCallback = () => {newUserPosition(0); console.log("I can't get your localization data :(");}
  
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
    return () => {
      window.navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
      const today = new Date().getDay();
      setDayNumber(today);
      console.log(userPositionData);
    }
  }, []);
  
  return (
    <Router>
      <UserLocContext.Provider value={userPositionData}>
      <DayContext.Provider value={dayNumber}>
        <div className="App">
          <Nav/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path = "/requiredForecast" component={RequiredWeather}/>
          </Switch>
          <Footer/>
        </div>
      </DayContext.Provider>
      </UserLocContext.Provider>
    </Router>
  );
}

export default App;
