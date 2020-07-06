require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

app.use(express.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://routing-assets-1576700044438.firebaseio.com"
});

const fireDb = admin.database();
const ref = fireDb.ref("restricted_access/secret_document");

app.post('/api/add-vehicles', (req, res) => {
  const { id, make, model, year } = req.body;

  const vehiclesRef = ref.child('vehicles');

  vehiclesRef.set({
    id,
    make,
    model,
    year,
  }, error => {
    if(error) { return res.json('data could not be saved.' + error) }
  });
  
});

app.get('/api/vehicles/get-active-vehicles', (req, res) => {
  const vehiclesRef = ref.child('vehicles');

  vehiclesRef.on('child_added', (snapshot, prevChildKey) => {
    console.log(snapshot.val())
  })

})

app.post(`/api/trips/add-trips`, (req, res) => {
  const { tripType, id, name, coords } = req.body;
  const tripsRef = ref.child(tripType === 'origins' ? 'origins': 'destinations');

    tripsRef.set({
      tripType,
      id,
      name,
      coords,
    }, error => {
      if(error) { 
        return res.json('data could not be saved.' + error) 
      } else {
        return res.json({ tripType, id, name, coords })
      }
    });
  
});

app.listen(5000, () => console.log('server is listening on port 5000'));