import { combineReducers } from 'redux';
import tripReducer from './trips';
import userReducer from './users';

export default combineReducers({ 
  trips: tripReducer, 
  users: userReducer 
})