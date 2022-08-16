import {createElement} from '../render.js';

const createFilmDetailsCommentsTemplate = () => `
<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
</section>`;

export default class FilmDetailsCommentsView {
  getTemplate () {
    return createFilmDetailsCommentsTemplate();
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
