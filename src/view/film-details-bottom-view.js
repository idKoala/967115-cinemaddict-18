import {createElement} from '../render.js';

const createFilmDetailsBottomTemplate = () => `
<div class="film-details__bottom-container"></div>`;

export default class FilmDetailsBottomView {
  getTemplate () {
    return createFilmDetailsBottomTemplate();
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
