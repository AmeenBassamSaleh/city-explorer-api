require('dotenv').config();
const express = require('express');
// const weather = require('./assets/weather.json');
// const superagent = require('superagent');
const cors = require('cors');

const app = express();

const Movi = require('./Component/Movi');
const weath = require('./Component/Weathe')

app.use(cors());

const PORT = process.env.PORT || 3020;
// const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
// const REACT_APP_MOVIE_API_KE = process.env.REACT_APP_MOVIE_API_KE;

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/weather', weath)


app.get('/movies', Movi)


app.listen(PORT, () => console.log('app is lisening on port ' + PORT))



// البكج، أحرف كبيرة للclass