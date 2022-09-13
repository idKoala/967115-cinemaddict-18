import {createElement} from '../render.js';

const createFilmsCounterTemplate = () =>
  `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`;

export default class FilmsCounterView {
  #element = null;

  get template () {
    return createFilmsCounterTemplate();
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
