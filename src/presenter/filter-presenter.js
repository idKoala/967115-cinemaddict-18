import MenuView from '../view/menu-view.js';
import UserRatingView from '../view/user-rating-view.js';
import {Filter} from '../utils.js';
import {FilterType, UpdateType} from '../const';
import {render, remove, replace} from '../framework/render';

const USER_RATING_FILTER = FilterType.HISTORY;

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #userRatingContainer = null;
  #userRatingComponent = null;
  #filterModel = null;
  #moviesModel = null;

  constructor (filterContainer, userRaitingContainer, filterModel, moviesModel) {
    this.#filterContainer = filterContainer;
    this.#userRatingContainer = userRaitingContainer;
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
    const prevUserRatingComponent = this.#userRatingComponent;
    const userRatingCount = Filter[USER_RATING_FILTER](this.#moviesModel.movies).length

    this.#filterComponent = new MenuView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeClick(this.#handleFilterTypeChange);
    this.#userRatingComponent = new UserRatingView(userRatingCount);
    render(this.#userRatingComponent, this.#userRatingContainer);


    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    replace(this.#userRatingComponent, prevUserRatingComponent)
    remove(prevFilterComponent);
    remove(prevUserRatingComponent);
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
