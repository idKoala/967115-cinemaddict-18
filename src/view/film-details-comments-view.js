import {createElement} from '../render.js';

const createFilmDetailsCommentsTemplate = (comments) => `
<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
</section>`;

export default class FilmDetailsCommentsView {
  #element = null;
  #comments = null;

  constructor (movie) {
    const {comments} = movie;
    this.#comments = comments;
  }

  get template () {
    return createFilmDetailsCommentsTemplate(this.#comments);
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
