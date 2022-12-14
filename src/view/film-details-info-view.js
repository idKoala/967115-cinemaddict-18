import AbstractView from '../framework/view/abstract-view.js';
import {getDayMonthYearFromDate, convertMinutesToHoursMinutes} from '../utils.js';

const createGenresTemplate = (genres) => {
  let genresTemplate = '';
  genres.forEach((genre) => {
    genresTemplate += `<span class="film-details__genre">${genre}</span>`;
  });

  return genresTemplate;
};

const createFilmDetailsInfoTemplate = (movie) =>
{ const {title, totalRating, poster, director, writers, actors, release, runtime, genre, description} = movie.film_info;
  const genresTemplate = createGenresTemplate(genre);

  return `<div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${poster}" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: The Great Flamarion</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${getDayMonthYearFromDate(release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${convertMinutesToHoursMinutes(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release.release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genre</td>
              <td class="film-details__cell">
                ${genresTemplate}</td>
            </tr>
          </tbody></table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>`;};

export default class FilmDetailsInfoView extends AbstractView {
  #popupMovie = null;

  constructor (popupMovie) {
    super();
    this.#popupMovie = popupMovie;
  }

  get template () {
    return createFilmDetailsInfoTemplate(this.#popupMovie);
  }
}
