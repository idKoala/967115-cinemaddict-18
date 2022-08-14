import {createElement} from '../render.js';

const createNewBoardTemplate = () =>
  '<section class="films"></section>';

export default class NewBoard {
  getTemplate () {
    return createNewBoardTemplate();
  }

  getElement () {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
