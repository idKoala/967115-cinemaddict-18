import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class MoviesApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateMovie = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adotpToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adotpToServer = (movie) => {
    const adoptedMovie = {
      ...movie,
      user_details: {
        ...movie.user_details,
        already_watched: movie['user_details']['alreadyWatched'],
        watchlist: movie['user_details']['wishlist']
      },
      film_info: {
        ...movie.film_info,
        age_rating: movie['film_info']['ageRating'],
        total_rating: movie['film_info']['totalRating']
      }
    };

    delete adoptedMovie['user_details']['alreadyWatched'];
    delete adoptedMovie['user_details']['wishlist'];
    delete adoptedMovie['film_info']['ageRating'];
    delete adoptedMovie['film_info']['totalRating'];

    return adoptedMovie;
  };
}
