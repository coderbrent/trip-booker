import axios from 'axios';
import * as actions from '../api';
const qs = require('qs');

const api = ({ dispatch }) => next => async action => {
  if(action.type !== actions.apiCallBegan.type) return next(action);

  const { 
    url, 
    headers, 
    method, 
    data, 
    onSuccess, 
    onError, 
    onStart 
  } = action.payload;
  
  if(onStart) dispatch({ type: onStart });
  next(action);
  // issue: missing req.body on server.
  try {
    const response = await axios.request({
      baseURL: 'http://localhost:5000/api',
      headers,
      url,
      method,
      data: qs.stringify.data,
    })
    console.log(data)
    dispatch(actions.apiCallSuccess(response.data));
    if(onSuccess)
      dispatch({ type: onSuccess, payload: response.data });
    } catch(error) {
    if(onError) dispatch({ type: onError, payload: error.message });
      dispatch(actions.apiCallFail(error.message));
  }
}

export default api;