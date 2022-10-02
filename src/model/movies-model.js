import Observable from '../framework/observable.js';
import {generateMovies} from '../mock/movie.js';


export default class MoviesModel extends Observable {
  #movies = generateMovies();

  get movies () {
    return this.#movies;
  }
}
