import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';


export default class MoviesModel extends Observable {
  #moviesApiService = null;
  #movies = [];

  constructor (moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  get movies () {
    return this.#movies;
  }

  init = async () => {
    try {
      const movies = await this.#moviesApiService.movies;
      this.#movies = movies.map(this.#adoptToClient);
    } catch (err) {
      this.#movies = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateMovie = async (updateType, update) => {
    
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {
      const response = await this.#moviesApiService.updateMovie(update);
      const updatedMovie = this.#adoptToClient(response);
      this.#movies = [
        ...this.#movies.slice(0, index),
        updatedMovie,
        ...this.#movies.slice(index + 1)
      ];
      this._notify(updateType, updatedMovie);
    } catch(err) {
      throw new Error('Can\'t update movie');
    }
  }

  convertToClientFormat = (movie) => this.#adoptToClient(movie);

  #adoptToClient = (movie) => {
    const adoptedMovie = {
      ...movie,
      user_details: {
        ...movie.user_details,
        alreadyWatched: movie['user_details']['already_watched'],
        wishlist: movie['user_details']['watchlist'],
      },
      film_info: {
        ...movie.film_info,
        ageRating: movie['film_info']['age_rating'],
        totalRating: movie['film_info']['total_rating']
      }
    };

    delete adoptedMovie['user_details']['already_watched'];
    delete adoptedMovie['user_details']['watchlist'];
    delete adoptedMovie['film_info']['age_rating'];
    delete adoptedMovie['film_info']['total_rating'];

    return adoptedMovie;
  }
}
