require('dotenv').config();
const superagent = require('superagent');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;



const getWeather = (req, res) => {
  // console.log(req.query.lat);
  // console.log('her is bake end');
  // console.log(req.query.lat);

  const weatherUrl = (`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`);

  superagent.get(weatherUrl).then(arrayOfData => {
    // console.log(arrayOfData.body);
    // console.log(arrayOfData.body.data[0]);

    const arrayOf = arrayOfData.body.data.map(data => new Weather(data));
    res.send(arrayOf); // sent to front
  }).catch(console.error)
  
  // console.log(weatherUrl);
  // console.log(req.query.name);

}

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = getWeather;