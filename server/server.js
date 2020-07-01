const express = require('express');
const app = express();
const axios = require('axios');
const key = 'AIzaSyC0VaGsv4vdS6aBw7otqrikEI4ykWbQRbE';
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb+srv://brent:Zsw0wers%21@cluster0-bfb3g.mongodb.net/trips?retryWrites=true&w=majority'

mongoose.connect(mongoURI, 
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('connection to DB is open'))

const tripSchema = new mongoose.Schema({
  id: String,
  tripType: String,
  name: String,
  coords: {
    lat: Number,
    lng: Number,
  }
});

const Trip = mongoose.model('Trip', tripSchema);

app.get(`/api/trips`, (req, res) => {
  const trips = {
    id: 943,
    tripType: 'origins',
    name: 'Brent',
    lat: 39.8483,
    lng: -74.4939
  }

  res.json(trips);

  // newTrip.save()

});

app.post(`/api/trips`, (req, res) => {
  const { id, tripType, name, coords } = req.body;
  
  const newTrip = new Trip({
    id, 
    tripType, 
    name, 
    coords: { 
      lat: coords.lat, 
      lng: coords.lng 
    }
  })
  
  res.json(newTrip);
});

app.listen(5000, () => console.log('server is listening on port 5000'));