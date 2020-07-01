import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { addTrip, removeTrip } from '../store/trips';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GoogleAutoComplete = ({ type }) => {
  const [address, setAddress] = useState('');
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  
  const searchOptions = {
    types: ['address']
  }

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    setAddress(value)

    dispatch(
      addTrip({
        tripType: type,
        id: results[0].place_id,
        name: results[0].formatted_address,
        coords: { 
          lat: latLng.lat,
          lng: latLng.lng
        }
      })
    )
    setId(results[0].place_id)    
  };

  const clearField = event => {
    event.preventDefault()

    dispatch(
      removeTrip({ tripType: type, id })
    )
    setAddress('')
  }
    
  return (
    <>
    <PlacesAutocomplete 
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div className="field">
        <div 
          className={ 
            loading ? 
              'control is-normal is-loading' : 
              'control is-normal'
            }
          >
        <input
          className="input mr-1 pb-1"
          name="address"
          type="text"
          {...getInputProps({ 
            placeholder: type === 'origins' ? "Origin" : "Destination"
          })}
        />
        </div>
        <div>
          { suggestions.map(suggestion => {
            const style = {
              fontFamily: 'Nunito',
              color: !suggestion.active ? `black` : `white`,
              backgroundColor: suggestion.active ? `#8A4D76` : `#D0D1CD`,
              padding: `.25rem`,
              width: `75%`,
              cursor: 'pointer'
            }
            return (
              <div {...getSuggestionItemProps(suggestion, { style })}> 
                { suggestion.description }
              </div>
            )
          })}
        </div>
        <button onClick={clearField}>clear marker</button>
      </div>
      )} 
    </PlacesAutocomplete>
    </>
  )
}

export default GoogleAutoComplete;