import {createElement} from '../render.js';

const createFilmDetailsCommentsTemplate = () => `
<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
</section>`;

export default class FilmDetailsCommentsView {
  #element = null;

  get template () {
    return createFilmDetailsCommentsTemplate();
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
