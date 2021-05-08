require('dotenv').config();
const superagent = require('superagent');
const REACT_APP_MOVIE_API_KE = process.env.REACT_APP_MOVIE_API_KE;


const getMovie = (req, res) => {
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

module.exports = getMovie;
