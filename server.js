require('dotenv').config();
const express = require('express');
// const weather = require('./assets/weather.json');
const superagent = require('superagent');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3020;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const REACT_APP_MOVIE_API_KE = process.env.REACT_APP_MOVIE_API_KE;

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/weather', getWeather)

function getWeather(req, res) {
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
  console.log(req.query.name);

}

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

app.get('/movies', getMovie)

function getMovie(req, res) {
  console.log('her is bake end movies');

  // const moviUrl = (`https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_MOVIE_API_KE}&language=en-US&include_adult=false&query=${req.query.query}`);

  const moviUrl = (`${REACT_APP_MOVIE_API_KE}&language=en-US&include_adult=false&query=${req.query.query}`);

  superagent.get(moviUrl).then(arrayOfDataMovi => {

    console.log(arrayOfDataMovi.body.results);

    const arrayOfMovi = arrayOfDataMovi.body.results.map(dataMovi => new Movies(dataMovi));
    res.send(arrayOfMovi); // sent to front

    // console.log(arrayOfMovi);

  }).catch(console.error)
  
  // console.log(weatherUrl);
  // console.log(req.query.name);

}

class Movies {
  constructor(dataMovi) {
    this.dataMovi = dataMovi.title;
    this.overview = dataMovi.overview;
    this.poster_path = dataMovi.poster_path;

    // this.description = dataMovi.weather.description;
  }
}


app.listen(PORT, () => console.log('app is lisening on port ' + PORT))



// البكج، أحرف كبيرة للclass