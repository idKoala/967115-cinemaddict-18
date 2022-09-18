import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsControlsTemplate = (userDetails) => {
  const {wishlist, alreadyWatched, favorite} = userDetails;

  const wishlistClassName = wishlist
    ? 'film-details__control-button--active'
    : '';

  const alreadyWatchedClassName = alreadyWatched
    ? 'film-details__control-button--active'
    : '';

  const favoriteClassName = favorite
    ? 'film-details__control-button--active'
    : '';

  return `
<section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${wishlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>`;};

export default class FilmDetailsControlsView extends AbstractView {
  #userDetails = null;

  constructor (movie) {
    super();
    const userDetails = movie.user_details;
    this.#userDetails = userDetails;
  }

  get template () {
    return createFilmDetailsControlsTemplate(this.#userDetails);
  }
}
