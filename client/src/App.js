import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import RequiredWeather from "./components/RequiredWeather/RequiredWeather.js";
import Nav from "./components/Nav/Nav.js";
import Footer from "./components/Footer/Footer.js";
import "./App.scss";
export const PositionContext = createContext(0);

const App = () => {
  const [userPosition, newUserPosition] = useState(0);

  const successCallback = (userPos) => {
    newUserPosition(userPos);
    console.log("I've got your localization data :]");
  };

  const failureCallback = () => {
    newUserPosition(0);
    console.log("I can't get your localization data :(");
  };
  
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      successCallback,
      failureCallback
    );
  }, []);

  return (
    <Router>
        <PositionContext.Provider value={userPosition}>
          <div className="App">
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/requiredForecast" component={RequiredWeather} />
            </Switch>
            <Footer />
          </div>
        </PositionContext.Provider>
    </Router>
  );
};

export default App;
