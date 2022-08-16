import {createElement} from '../render.js';

const createFilmDetailsTopTemplate = () => `
<div class="film-details__top-container"></div>`;

export default class FilmDetailsTopView {
  getTemplate () {
    return createFilmDetailsTopTemplate();
  }

  getElement () {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
