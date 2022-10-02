import {remove, render} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmPresenter from './film-presenter.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import SortView from '../view/sort-view.js';
import {sortMoviesRating, sortMovieDate} from '../utils.js';
import {Filter} from '../utils.js';
import {SortType, UpdateType, UserAction} from '../const.js';

const MOVIES_COUNT_PER_STEP = 5;

export default class BoardPresenter {
  #boardComponent = new BoardView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = null;
  #filmsListTitleComponent = new FilmsListTitleView();
  #renderedMoviesCount = MOVIES_COUNT_PER_STEP;
  #sortContainer = null;
  #boardContainer = null;
  #moviesModel = null;
  #filterModel = null;
  #currentSortType = SortType.DEFAULT;
  #filmPresenter = new Map();

  constructor (boardContainer, moviesModel, filterModel) {
    this.#boardContainer = boardContainer;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get movies () {
    const filterType = this.#filterModel.filter;
    const movies = this.#moviesModel.movies;
    const filteredMovies = Filter[filterType](movies);
    
    switch (this.#currentSortType) {
      case SortType.RATING:
        return filteredMovies.sort(sortMoviesRating);
      case SortType.DATE:
        return filteredMovies.sort(sortMovieDate);
    }

    return filteredMovies;
  }


  init () {
    this.#renderBoard();

  }

  #renderFilmsListTitle = () => {
    render(this.#filmsListTitleComponent, this.#filmsListComponent.element);
  };

  #renderBoard = () => {
    this.#renderSort();
    render(this.#boardComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#boardComponent.element);

    if (this.movies.length === 0) {
      this.#renderFilmsListTitle();
      return;
    }

    this.#renderFilmsList();
  };

  #renderSort = () => {
    this.#sortContainer = new SortView(this.#currentSortType);
    this.#sortContainer.setOnSortTypeChange(this.#handleSortTypeChange);
    render(this.#sortContainer, this.#boardContainer);
  };

  #renderFilmsList = () => {
    const moviesCount = this.movies.length;
    const movies = this.movies.slice(0, Math.min(moviesCount, MOVIES_COUNT_PER_STEP));
    
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

    this.#renderFilms(movies);
    if (moviesCount > MOVIES_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    this.#showMoreButtonComponent.setOnButtonClick(this.#onShowMoreButtonClick);
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
  };

  #renderFilms = (movies) => {
    movies.forEach((movie) => this.#renderFilmCard(movie));
  };

  #onShowMoreButtonClick = () => {
    const moviesCount = this.movies.length;
    const newRenderesMoviesCount = Math.min(moviesCount, this.#renderedMoviesCount + MOVIES_COUNT_PER_STEP);

    const movies = this.movies.slice(this.#renderedMoviesCount, newRenderesMoviesCount);

    this.#renderedMoviesCount = newRenderesMoviesCount; 
    this.#renderFilms(movies);

    if (this.#renderedMoviesCount > moviesCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#moviesModel.updateMovie(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilms();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilms({resetSortType: true});
        this.#renderBoard();
        break;
    }
  }

  #clearFilms = ({resetSortType = false} = {}) => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    remove(this.#sortContainer);
    remove(this.#filmsListTitleComponent);
    remove(this.#showMoreButtonComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearFilms();
    this.#renderBoard();
  };

  #renderFilmCard = (movie) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#handleViewAction);
    filmPresenter.init(movie);
    this.#filmPresenter.set(movie.id, filmPresenter);
  };
}
