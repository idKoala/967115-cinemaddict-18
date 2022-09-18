import AbstractView from '../framework/view/abstract-view.js';

const createFilmsCounterTemplate = (movies) =>
  `<section class="footer__statistics">
    <p>${movies.length} movies inside</p>
  </section>`;

export default class FilmsCounterView extends AbstractView {
  #movies = null;

  constructor (movies) {
    super();
    this.#movies = movies;
  }

  get template () {
    return createFilmsCounterTemplate(this.#movies);
  }
}
