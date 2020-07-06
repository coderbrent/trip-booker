import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GoogleMap from '../Components/GoogleMap';
import GoogleAutoComplete from '../Components/GoogleAutoComplete';

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
          <p className="is-light">Enter an origin and a destination and click submit to save a trip to your profile.</p>
          <div style={{ margin: '.9rem 0rem'}}>
          </div>
          <div style={{ margin: `1rem 0rem`}}>
            <GoogleAutoComplete type="origins" />
            <GoogleAutoComplete type="destinations" />
            <a className="button is-primary">Submit</a>
          </div>
        </form>
    </div>
  </>
  )
}

export default Dashboard;