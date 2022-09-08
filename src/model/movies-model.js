import {generateMovies} from '../mock/movie.js';

export default class MoviesModel {
  movies = generateMovies();

  getMovies = () => this.movies;
}
