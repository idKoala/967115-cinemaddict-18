import {createElement} from '../render.js';

const createMenuTemplate = () => `
<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">0</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">0</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">0</span></a>
</nav>
`;

export default class MenuView {
  getTemplate () {
    return createMenuTemplate();
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