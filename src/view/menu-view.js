import AbstractView from '../framework/view/abstract-view.js';

const createMenuItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  if (type === 'all') {
    return `<a 
      href="#${type}" 
      class="main-navigation__item ${
        type === currentFilterType ? 'main-navigation__item--active' : ''
      }" data-filter-type='${type}'>
      ${name} 
      </a>`;
  }
  return `
  <a 
    href="#${type}" 
    class="main-navigation__item ${
      type === currentFilterType ? 'main-navigation__item--active' : ''
    }" data-filter-type='${type}'>
    ${name} 
    <span 
      class="main-navigation__item-count">
      ${count}
    </span>
    </a>`;
};

const createMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.reduce((previousValue, currentValue) => previousValue + createMenuItemTemplate(currentValue, currentFilterType), '');
  return `
    <nav class="main-navigation">
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
