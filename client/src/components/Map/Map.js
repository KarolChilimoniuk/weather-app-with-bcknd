import React from 'react';
import {withScriptjs, GoogleMap, withGoogleMap} from 'react-google-maps';
import styles from './Map.module.scss';

const Map = withScriptjs(withGoogleMap(({lat, lng}) => {
  return (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: lat, lng: lng }}
  />
  );
}));

export default Map;