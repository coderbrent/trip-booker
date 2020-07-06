import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { useSelector, useDispatch } from 'react-redux';
import { routingDataReceived, routingDataCleared } from '../store/trips';
import { loadVehicles } from '../store/vehicles';

const GoogleMap = props => {
  const [localMap, setMap] = useState();
  const origins = useSelector(state => state.entities.trips.origins);
  const destinations = useSelector(state => state.entities.trips.destinations);
  const vehicles = useSelector(state => state.entities.vehicles);
  const dispatch = useDispatch();

  const directionsService = new google.maps.DirectionsService;
  const directionsRenderer = new google.maps.DirectionsRenderer;

  const buildRoute = e => {
    e.preventDefault();
   
    directionsRenderer.setMap(null);
    
    let origin = { lat: origins[0].lat, lng: origins[0].lng };
    let destination = { lat: destinations[0].lat, lng: destinations[0].lng };
     
    directionsService.route({ origin, destination, travelMode: 'DRIVING' }, result => {
      directionsRenderer.setMap(localMap);
      directionsRenderer.setDirections(result);
      dispatch(routingDataReceived(JSON.stringify(result)));
    });
  };

  useEffect(() => {
    fetchVehicles();
  })

  const fetchVehicles = () => {
    fetch('http://localhost:5000/api/vehicles/get-active-vehicles')
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const clearRoute = () => {
    dispatch(routingDataCleared());
  }

  return (
    <div style={{ height: '15rem', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
      defaultCenter={{ lat: 40.310134, lng: -74.27660709999999 }}
      defaultZoom={8}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        setMap(map);
      }}
    >
      {
        // available vehicles...
      }
    </GoogleMapReact>
    <button 
      disabled={ origins.length != 0 && destinations.length != 0 ? false : true } 
      onClick={buildRoute}
    >
      build route
    </button>
    <button onClick={clearRoute}>Clear Route</button>
    </div>
  )
};

export default GoogleMap;