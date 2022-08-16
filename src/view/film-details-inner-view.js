import {createElement} from '../render.js';

const createFilmDetailsInnerTemplate = () => `
<div class="film-details__inner"></div>`;

export default class FilmDetailsInnerView {
  getTemplate () {
    return createFilmDetailsInnerTemplate();
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
