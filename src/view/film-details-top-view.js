import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsTopTemplate = () => `
<div class="film-details__top-container"></div>`;

export default class FilmDetailsTopView extends AbstractView {
  get template () {
    return createFilmDetailsTopTemplate();
  }
}
