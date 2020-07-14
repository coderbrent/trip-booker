require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const port = 5000 || process.env.PORT;
const db = mongoose.connection;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('DB connection successful.'))

app.use(express.json());
app.use(cors());

app.post('/api/vehicles/add-vehicles', (req, res) => {

});

app.get('/api/vehicles/get-active-vehicles', (req, res) => {

})

app.post(`/api/trips/add-trips`, (req, res) => {
 
});

app.listen(port, () => console.log('server is listening on port 5000'));