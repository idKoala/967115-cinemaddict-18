import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

const createSortItemsTemplate = (sortType, value, currentSortType) => {
  return `
  <li><a href="#" class="sort__button ${currentSortType === value ? 'sort__button--active' : ''}" data-sort-type=${value}>Sort by ${value}</a></li>
  `;
}

const createSortTemplate = (currentSortType) =>
  { let sortList = '';
    for (const [sortType, value] of Object.entries(SortType)) {
      sortList += createSortItemsTemplate(sortType, value, currentSortType);
    }
    return `<ul class="sort">
    ${sortList}
</ul>`};

{/* <li><a href="#" class="sort__button ${currentSortType === SortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type=${SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.DATE ? 'sort__button--active' : ''}" data-sort-type=${SortType.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === SortType.RATING ? 'sort__button--active' : ''}" data-sort-type=${SortType.RATING}>Sort by rating</a></li> */}

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor (currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  
  get template () {
    return createSortTemplate(this.#currentSortType);
  }

  setOnSortTypeChange = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#onSortTypeChange);
  };

  #onSortTypeChange = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
