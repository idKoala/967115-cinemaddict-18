import {createElement} from '../render.js';

const createFilmsCounterTemplate = (movies) =>
  `<section class="footer__statistics">
    <p>${movies.length} movies inside</p>
  </section>`;

export default class FilmsCounterView {
  #element = null;
  #movies = null;

  constructor (movies) {
    this.#movies = movies;
  }

  get template () {
    return createFilmsCounterTemplate(this.#movies);
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
