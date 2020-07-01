import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GoogleMap from '../Components/GoogleMap';
import GoogleAutoComplete from '../Components/GoogleAutoComplete';
import { userAdded, userRemoved } from '../store/users';

const Dashboard = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((success, error) => {
        if(error) console.log(error)
        let lat = success.coords.latitude
        let lng = success.coords.longitude
      })
    } else {
      console.warn('this browser does not support geolocation - user location unavailable')
    }
  }, []);

  const addUsers = () => {
    dispatch(
      userAdded({ 
        id: 1, 
        firstname: 'brent', 
        lastname: 'abruzese', 
        email: 'brent.abruzese@gmail.com',
        avatar: 'https://www.pictureofsomething.com/jpg',
      }
    ))
  };

  const removeUsers = () => {
    dispatch(
      userRemoved({ id: 1 })
    )
  };
  
  return (
  <>
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '90%',
      height: '100%',
      gridGap: '1rem',
      margin: '1rem'
    }}>
      <GoogleMap />
        <form>
          <h1 className="title-is-1">Trip Maker</h1>
            <p className="is-light">Where you from? Type in your address and then fill out a message </p>
          <div style={{ margin: '.9rem 0rem'}}>
          </div>
          <div style={{ margin: `1rem 0rem`}}>
            <GoogleAutoComplete type="origins" />
            <GoogleAutoComplete type="destinations" />
            <a className="button is-primary">Submit</a>
          </div>
        </form>
    </div>
    <button onClick={addUsers}>add user</button>
    <button onClick={removeUsers}>delete user</button>
  </>
  )
}

export default Dashboard;