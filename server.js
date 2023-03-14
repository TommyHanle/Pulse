const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const axios = require('axios');
require('dotenv').config();
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
const searchRouter = require('./routes/api/search');
app.use('/api/search', searchRouter);
app.get('/api/mapbox/:searchZip', async (req, res) => {
  const searchZip = req.params.searchZip;
  const accessToken = process.env.REACT_APP_MAPBOX;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchZip}.json?country=US&access_token=${accessToken}`;

  try {
    const response = await axios.get(url);
    const lng = response.data.features[0].center[0];
    const lat = response.data.features[0].center[1];
    res.json({ lng, lat, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data from Mapbox API');
  }
});

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});
