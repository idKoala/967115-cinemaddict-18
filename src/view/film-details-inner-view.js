import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsInnerTemplate = () => `
<div class="film-details__inner"></div>`;

export default class FilmDetailsInnerView extends AbstractView {
  get template () {
    return createFilmDetailsInnerTemplate();
  }
}
