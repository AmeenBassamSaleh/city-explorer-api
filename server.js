require('dotenv').config();
const express = require('express');
const weather = require('./assets/weather.json');
const superagent = require('superagent');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3020;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/weather', getWeather)

function getWeather(req, res) {
  console.log(req.query.lat);
  console.log('her is bake end');
  // console.log(req.query.lat);

  const weatherUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`);
  // const weatherUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=-23.62153185&lon=-46.6799024176782`);

  superagent.get(weatherUrl).then(arrayOfData => {
    // console.log(arrayOfData.body);
    console.log(arrayOfData.body.data[0]);

    const arrayOf = arrayOfData.body.data.map(data => new Weather(data));
    res.send(arrayOf); // sent to front
  }).catch(console.error)
  
  // console.log(weatherUrl);
  console.log(req.query.name);

}


class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

app.listen(PORT, () => console.log('app is lisening on port ' + PORT))



// البكج، أحرف كبيرة للclass