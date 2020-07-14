import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { useSelector, useDispatch } from 'react-redux';
import { routingDataReceived, routingDataCleared } from '../store/trips';
import MapMarker from './MapMarker';

const GoogleMap = () => {
  const [localMap, setMap] = useState();
  const [vehiclePool, setVehiclePool] = useState([]); // use local state to store a list of active vehicle ids
  const origins = useSelector(state => state.entities.trips.origins);
  const destinations = useSelector(state => state.entities.trips.destinations);
  const dispatch = useDispatch();

  const getVehicles = async () => {
    await fetch('http://localhost:5000/api/vehicles/get-active-vehicles')
    .then(response => response.json())
    .then(data => {
      setVehiclePool(data);
    });
  };

  const buildRoute = e => {
    e.preventDefault();
    const directionsService = new google.maps.DirectionsService;
    const directionsRenderer = new google.maps.DirectionsRenderer;
    const origin = { 
      lat: origins[0].lat, 
      lng: origins[0].lng 
    };
    const destination = { 
      lat: destinations[0].lat, 
      lng: destinations[0].lng 
    };

    directionsService.route(
      { 
        origin, 
        destination, 
        travelMode: 'DRIVING' 
      }, result => {
        directionsRenderer.setMap(localMap);
        directionsRenderer.setDirections(result);
        dispatch(routingDataReceived(JSON.stringify(result))); //dispatch results to store
      }
    );
    setTimeout(() => { getVehicles() }, 3000)
  };

  const clearRoute = () => {
    dispatch(routingDataCleared());
  };

  const findClosestVehicles = () => {
    const { lat, lng } = vehiclePool[3][1];
    const service = new google.maps.DistanceMatrixService();

    const callback = (response, status) => {
      if(status === 'OK') {
        console.log(response.rows[0].elements[0].distance)
        console.log(response.rows[0].elements[0].duration)
      }
    };

    service.getDistanceMatrix(
      { 
        origins: [
          new google.maps.LatLng(lat, lng)
        ], 
        destinations: [ 
          new google.maps.LatLng(origins[0].lat, origins[0].lng) 
        ],
        travelMode: 'DRIVING',
      }, callback
    )
  };

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
      vehiclePool.length > 1 &&
      vehiclePool[3].map((el, i) => {
        <MapMarker
          lat={el.lat}
          lng={el.lng}
        />
      })
    }
    </GoogleMapReact>
    <button 
      disabled={origins.length != 0 && destinations.length != 0 ? false : true} 
      onClick={buildRoute}
    >
      build route
    </button>
    <button onClick={clearRoute}>Clear Route</button>
    <button onClick={() => console.log(vehiclePool)}>see vehicle pool</button>
    <button onClick={findClosestVehicles}>find closest vehicles</button>
    </div>
  )
};

export default GoogleMap;