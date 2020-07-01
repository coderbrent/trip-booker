import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

const trips = {
  loading: false,
  lastFetch: null,
  origins: [],
  destinations: [],
  routingData: [],
}

const slice = createSlice({
  name: 'trips',
  initialState: trips,
  reducers: {
    tripAdded: (trips, action) => {
      const { id, tripType, name, coords } = action.payload;
      if(trips[tripType].length < 1) {
        trips[tripType].push({ 
          id, 
          tripType,
          name, 
          lat: coords.lat, 
          lng: coords.lng 
        })
      } else {
        return console.error(`cannot add more than one ${tripType} point`)
      }
    },
    removeTrip: (trips, action) => {
      const { id, tripType } = action.payload;
      if(trips[tripType].length !== 0) {
        const index = trips[tripType].findIndex(trip => trip.id === id)
        console.log(index);
        trips[tripType].pop(index)
      } else {
        return console.error('no trips to remove!')
      }
    },
    tripAssignedToUser: (trips, action) => {
      const { tripId, tripType, userId } = action.payload;
      const index = trips[tripType].findIndex(trip => trip.id === tripId);
      trips[index].userId = userId;
    },
    tripsRequested: (trips, action) => {
      trips.loading = true;
    },
    tripsReceived: (trips, action) => {
      const { tripType } = action.payload;
      trips[tripType].push(action.payload);
      trips.loading = false;
      trips.lastFetch = Date.now();
    },
    tripsRequestFailed: (trips, action) => {
      trips.loading = false;
    },
    directionsResponseReceived: (trips, action) => {
      const { routes } = action.payload;
      const resObj = Object.assign({}, routes);
      trips.routingData.push(resObj);
    },
  }
});

const url = '/trips'; //sloppy

//api action creators
export const loadTrips = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.trips;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  // use moment to check when last fetch occurred - do not dispatch again if younger than 10 min
  if(diffInMinutes < 10) return; 

  dispatch(
    apiCallBegan({
      url,
      onStart: tripsRequested.type,
      onSuccess: tripsReceived.type,
      onError: tripsRequestFailed.type,
    })
  );
};

export const addTrip = trip => apiCallBegan({
  url,
  method: 'post',
  data: trip,
  onSuccess: tripAdded.type
});

export const getDirections = (origin, destination) => apiCallBegan({
  url: `/get-directions`,
  headers: { "Content-Type": "application/json" },
  method: 'get',
  data: { origin, destination },
  onSuccess: directionsResponseReceived.type
})
  
export const { 
  tripsRequested,
  tripsRequestFailed,
  tripsReceived,
  tripAdded,
  tripAssignedToUser,
  removeTrip,
  directionsResponseReceived,
} = slice.actions;

export default slice.reducer;