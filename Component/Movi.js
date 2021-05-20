require('dotenv').config();
const superagent = require('superagent');
const REACT_APP_MOVIE_API_KE = process.env.REACT_APP_MOVIE_API_KE;

cache = {}; // lab10

const getMovie = (req, res) => {
  if (cache[req.query.query]!== defined) {
    res.send(cache[req.query.query])

    console.log('gitting data -----------------------------------------');

  } else {
    try {

      console.log(cache);
      console.log('her is bake end movies');
      // const moviUrl = (`https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_MOVIE_API_KE}&language=en-US&include_adult=false&query=${req.query.query}`);

      const moviUrl = (`${REACT_APP_MOVIE_API_KE}&language=en-US&include_adult=false&query=${req.query.query}`);

      superagent.get(moviUrl).then(arrayOfDataMovi => {

        // console.log(arrayOfDataMovi.body.results);

        const arrayOfMovi = arrayOfDataMovi.body.results.map(dataMovi => new Movies(dataMovi));
        // res.send(arrayOfMovi); // sent to front

        
        
        cache[req.query.query] = arrayOfMovi;
        res.send(arrayOfMovi);
        
        console.log('---------------------------------------');
        // console.log(cache[req.query.query]);
      })
    } catch {(console.error)
    }
  }
 

  // console.log(weatherUrl);
  // console.log(req.query.name);

}

class Movies {
  constructor(dataMovi) {
    this.dataMovi = dataMovi.title;
    this.overview = dataMovi.overview;
    this.poster_path = dataMovi.poster_path;
    this.average_votes = dataMovi.average_votes;
    this.total_votes = dataMovi.total_votes;
    this.popularity = dataMovi.popularity;
    this.released_on = dataMovi.released_on

    // this.description = dataMovi.weather.description;
  }
}

module.exports = getMovie;
