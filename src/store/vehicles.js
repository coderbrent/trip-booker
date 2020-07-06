import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import moment from 'moment';

const vehicles = {
  id: '',
  loading: false,
  make: '',
  model: '',
  year: '',
  onDuty: false,
  currentDriver: '',
  currentTrips: [], // ids only
  currentLocation: {
    lat: '',
    lng: ''
  },
  etaToNextTrip: null,
  pastTrips: [], // ids only
  upcomingTrips: [],
}

const slice = createSlice({
  name: 'vehicles',
  initialState: vehicles,
  reducers: {
    vehicleAdded: (vehicles, action) => {
      const { 
        id, 
        make,
        model,
        year, 
      } = action.payload; 

      vehicles.push({ 
        id, 
        make,
        model,
        year,
      })
    },
    removeVehicle: (vehicles, action) => {
      const { id } = action.payload;
      if(vehicles.length !== 0) {
        const index = vehicles.findIndex(vehicle => vehicle.id === id)
        vehicles.pop(index)
      } else {
        return console.error('no vehicles to remove!')
      }
    },
    vehicleAssignedToDriver: (vehicles, action) => {
      const { 
        id, 
        driverId,
      } = action.payload;
      const index = vehicles.findIndex(vehicle => vehicle.id === id);
      vehicles[index].currentDriver = driverId;
    },
    vehiclesRequested: (vehicles, action) => {
      vehicles.loading = true;
    },
    vehiclesReceived: (vehicles, action) => {
      vehicles.push(action.payload);
      vehicles.loading = false;
      vehicles.lastFetch = Date.now();
    },
    vehiclesRequestFailed: (vehicles, action) => {
      vehicles.loading = false;
    },
  }
});

const url = '/vehicles'; //sloppy - put this somewhere else ie. config file

//api action creators
export const loadVehicles = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.vehicles;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  // use moment to check when last fetch occurred - do not dispatch again if younger than 10 min
  if(diffInMinutes < 10) return; 

  dispatch(
    apiCallBegan({
      url: '/vehicles/get-active-vehicles',
      onStart: vehiclesRequested.type,
      onSuccess: vehiclesReceived.type,
      onError: vehiclesRequestFailed.type,
    })
  );
};

export const addVehicle = vehicle => apiCallBegan({
  url,
  method: 'post',
  data: vehicle,
  onSuccess: vehicleAdded.type
});
  
export const { 
  vehiclesRequested,
  vehiclesRequestFailed,
  vehiclesReceived,
  vehicleAdded,
  vehicleAssignedToDriver,
  removeVehicle,
} = slice.actions;

export default slice.reducer;