

import {getMovie} from './data.js';

const generateMovies = function (amount) {
  let movies = [];
  for (let i = 0; i < amount; i++) {
    movies.push(getMovie());
  }
  return movies;
};

export {generateMovies};
