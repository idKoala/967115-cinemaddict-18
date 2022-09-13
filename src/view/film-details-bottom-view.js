import {createElement} from '../render.js';

const createFilmDetailsBottomTemplate = () => `
<div class="film-details__bottom-container"></div>`;

export default class FilmDetailsBottomView {
  #element = null;

  get template () {
    return createFilmDetailsBottomTemplate();
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
