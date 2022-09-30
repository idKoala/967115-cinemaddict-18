import AbstractView from '../framework/view/abstract-view.js';
import {capitalizeFirstLetter} from '../utils.js';

const createMenuItemTemplate = (filter) => {
  const {name, count} = filter;

  return `
  <a 
    href="#${name}" 
    class="main-navigation__item">
    ${capitalizeFirstLetter(name)} 
    <span 
      class="main-navigation__item-count">
      ${count}
    </span>
    </a>`;
};

const createMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter) => createMenuItemTemplate(filter)).join('');


  return `
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </nav>
`;};

export default class MenuView extends AbstractView {
  #filters = null;

  constructor (filters) {
    super();
    this.#filters = filters;
  }

  get template () {
    return createMenuTemplate(this.#filters);
  }
}
