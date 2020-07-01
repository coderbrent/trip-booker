import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  GoogleMap, 
  LoadScript, 
  DirectionsRenderer, 
  DirectionsService 
} from '@react-google-maps/api';

const containerStyle = {
  lat: -3.745,
  lng: -38.523
}

const center = {
  lat: -3.745,
  lng: -38.523
};

function NewMap() {
  const origin = useSelector(state => state.entities.trips.origin);
  const destination = useSelector(state => state.entities.trips.destination);
  const [response, setResponse] = useState();

  const directionsCallback = response => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
      } else {
        console.log('response: ', response)
      }
    }
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDbnIg8wB7mATLm6NCPqXiYEiCR1ucyEmI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      {
        (
          destination !== '' &&
          origin !== ''
        ) && (
          <DirectionsService
            options={{ 
              destination: { lat: 40.313507, lng: -74.288087 },
              origin: { lat: 40.6895314, lng: -73.1766564 },
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
        )
      }
      {
        response !== null && (
          <DirectionsRenderer
            options={{ 
              directions: response
            }}
          />
        )
      }
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(NewMap)