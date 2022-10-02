import AbstractView from '../framework/view/abstract-view.js';
import {capitalizeFirstLetter} from '../utils.js';

const createMenuItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `
  <a 
    href="#${type}" 
    class="main-navigation__item ${
      type === currentFilterType ? 'main-navigation__item--active' : ''
    }" data-filter-type='${type}'>
    ${capitalizeFirstLetter(name.toLowerCase())} 
    <span 
      class="main-navigation__item-count">
      ${count}
    </span>
    </a>`;
};

const createMenuTemplate = (filterItems, currentFilterType) => {
  // Заменить на reduce
  const filterItemsTemplate = filterItems.map((filter) => createMenuItemTemplate(filter, currentFilterType)).join('');


  return `
    <nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </nav>
`;};

export default class MenuView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor (filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template () {
    return createMenuTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeClick = (callback) => {
    this._callback.filterTypeClick = callback;
    this.element.addEventListener('click', this.#onFilterTypeClick);

  }

  #onFilterTypeClick = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeClick(evt.target.dataset.filterType);
  }

}
