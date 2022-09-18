import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsBottomTemplate = () => `
<div class="film-details__bottom-container"></div>`;

export default class FilmDetailsBottomView extends AbstractView {
  get template () {
    return createFilmDetailsBottomTemplate();
  }
}
