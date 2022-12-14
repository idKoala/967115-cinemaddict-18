import {getYearFromDate, convertMinutesToHoursMinutes} from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

const createFilmCardTemplate = (movie) =>
{ const {
  title,
  totalRating,
  runtime,
  genre,
  description,
  poster,
  release} = movie.film_info;
const {comments} = movie;
const {wishlist, alreadyWatched, favorite} = movie.user_details;

const wishlistClassName = wishlist
  ? 'film-card__controls-item--active'
  : '';

const alreadyWatchedClassName = alreadyWatched
  ? 'film-card__controls-item--active'
  : '';

const favoriteClassName = favorite
  ? 'film-card__controls-item--active'
  : '';

return `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
    <span class="film-card__year">${getYearFromDate(release.date)}</span>
    <span class="film-card__duration">${convertMinutesToHoursMinutes(runtime)}</span>
    <span class="film-card__genre">${genre.join(', ')}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${wishlistClassName}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
  </div>
</article>`;};

export default class FilmCardView extends AbstractView {
  #movie = null;

  constructor (movie) {
    super();
    this.#movie = movie;
  }

  get template () {
    return createFilmCardTemplate(this.#movie);
  }
}
