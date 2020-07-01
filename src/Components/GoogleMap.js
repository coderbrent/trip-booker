import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { useSelector } from 'react-redux'
import MapMarker from './MapMarker';
import { directionsResponseReceived } from '../store/trips';

const GoogleMap = props => {
  const [localMap, setMap] = useState();
  const origins = useSelector(state => state.entities.trips.origins);
  const destinations = useSelector(state => state.entities.trips.destinations);
 
  return (
    <div style={{ height: '15rem', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
      defaultCenter={{ lat: 40.310134, lng: -74.27660709999999 }}
      defaultZoom={8}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({map, maps}) => {
        directionsResponseReceived()
        setMap(map);
        
      }}
    >
      { 
        origins.map(origin => (
          <MapMarker
            key={origin.id}
            id={origin.id}
            tripType={origin.tripType}
            lat={origin.lat} 
            lng={origin.lng} 
          />
        ))
      }
       { 
        destinations.map(dest => (
          <MapMarker
            key={dest.id}
            id={origin.id}  
            tripType={dest.tripType}
            lat={dest.lat} 
            lng={dest.lng}
          />
        ))
      }
    </GoogleMapReact>
    <button onClick={() => console.log(localMap)}>ss</button>
    </div>
  )
}

export default GoogleMap;