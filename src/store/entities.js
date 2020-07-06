import { combineReducers } from 'redux';
import tripReducer from './trips';
import userReducer from './users';
import vehicleReducer from './vehicles';

export default combineReducers({ 
  trips: tripReducer, 
  users: userReducer,
  vehicles: vehicleReducer,
})