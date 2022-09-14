import {createElement} from '../render.js';

const createFilmDetailsTopTemplate = () => `
<div class="film-details__top-container"></div>`;

export default class FilmDetailsTopView {
  #element = null;

  get template () {
    return createFilmDetailsTopTemplate();
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
