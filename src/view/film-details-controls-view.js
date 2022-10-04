import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

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

export default class FilmDetailsControlsView extends AbstractStatefulView {
  #userDetails = null;

  constructor (movie) {
    super();
    this._state = movie.user_details;
    this.#setInnerHandlers();

  }

  get template () {
    return createFilmDetailsControlsTemplate(this._state);
  }

  #onWishListClick = () => {
    this.updateElement({
      'wishlist': !this._state.wishlist
    });
  };

  #onWatchedClick = () => {
    this.updateElement({
      'alreadyWatched': !this._state.alreadyWatched
    });
  };

  #onFavouriteClick = () => {
    this.updateElement({
      'favorite': !this._state.favorite
    });
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#onWishListClick);

    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#onWatchedClick);

    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#onFavouriteClick);

  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setOnWishListClick(this._callback.wishListClick);
    this.setOnWatchedClick(this._callback.watchedClick);
    this.setOnFavouriteClick(this._callback.favoriteClick);
  };

  setOnWishListClick = (callback) => {
    this._callback.wishListClick = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#wishListClickHandler);
  };

  setOnWatchedClick = (callback) => {
    this._callback.watchedClick = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedClickHandler);
  };

  setOnFavouriteClick = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favouriteClickHandler);
  };

  #wishListClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.wishListClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favouriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

}
