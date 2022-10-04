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
      console.log(this.#movies);
    } catch (err) {
      this.#movies = [];
    }

    this._notify(UpdateType.INIT);
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
