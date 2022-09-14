import {generateMovies} from '../mock/movie.js';

export default class MoviesModel {
  #movies = generateMovies();

  get movies () {
    return this.#movies;
  }
}
