import Observable from '../framework/observable.js';
import {generateMovies} from '../mock/movie.js';


export default class MoviesModel extends Observable {
  #movies = generateMovies();

  get movies () {
    return this.#movies;
  }

  updateMovie (updateType, update) {
    
    const index = this.#movies.findIndex((movie) => movie.id === update.id);
    console.log(`index ${index}`);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1)
    ]

    console.log(this.#movies);

    this._notify(updateType, update);

  }
}
