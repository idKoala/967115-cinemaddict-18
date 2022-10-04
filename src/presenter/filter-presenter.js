import MenuView from '../view/menu-view.js';
import {Filter} from '../utils.js';
import {FilterType, UpdateType} from '../const';
import {render, remove, replace} from '../framework/render';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #moviesModel = null;

  constructor (filterContainer, filterModel, moviesModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  get filters () {
    const movies = this.#moviesModel.movies;

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: Filter[FilterType.ALL](movies).length
      },
      {
        type: FilterType.FAVOURITES,
        name: 'Favourites',
        count: Filter[FilterType.FAVOURITES](movies).length
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: Filter[FilterType.HISTORY](movies).length
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: Filter[FilterType.WATCHLIST](movies).length
      }
    ];
  }

  init () {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new MenuView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeClick(this.#handleFilterTypeChange);


    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
