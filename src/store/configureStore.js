import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import toastify from './middleware/toastify';
import api from './middleware/api';

export default function() {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      toastify,
      api,
    ]
  })
}