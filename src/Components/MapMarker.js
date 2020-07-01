import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MapMarker = ({ tripType }) =>  { 
  return (
    <FontAwesomeIcon 
      icon={ tripType === 'origins' ? 'map-marker' : 'map-marker-alt'}
    /> 
  )
}

export default MapMarker;