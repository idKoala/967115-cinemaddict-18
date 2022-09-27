import {render} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import FilmPresenter from './film-presenter.js';
import CommentsModel from '../model/comments-model.js';
import FilmsListTitleView from '../view/films-list-title-view.js';
import {updateItem} from '../utils.js';

const MOVIES_COUNT_PER_STEP = 5;

// const siteBodyElement = document.querySelector('body');
// const footerElement = document.querySelector('.footer');


export default class BoardPresenter {
  #boardComponent = new BoardView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsListTitleComponent = new FilmsListTitleView();
  #renderedMoviesCount = MOVIES_COUNT_PER_STEP;
  #boardContainer = null;
  #moviesModel = null;
  #movies = null;
  #filmPresenter = new Map();

  constructor (boardContainer, moviesModel) {
    this.#boardContainer = boardContainer;
    this.#moviesModel = moviesModel;
  }


  init () {
    this.#movies = [...this.#moviesModel.movies];
    this.#renderBoard();

  }

  #renderFilmsListTitle = () => {
    render(this.#filmsListTitleComponent, this.#filmsListComponent.element);
  }

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#boardComponent.element);

    if (this.#movies.length === 0) {
      this.#renderFilmsListTitle();
      return;
    }

    this.#renderFilmsList();
  };

  #renderFilmsList = () => {
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    this.#renderFilms();
    if (this.#movies.length > MOVIES_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#filmsListComponent.element);
    this.#showMoreButtonComponent.setOnButtonClick(this.#onShowMoreButtonClick);
  }

  #renderFilms = () => {
    for (let i = 0; i < Math.min(this.#movies.length, MOVIES_COUNT_PER_STEP); i++)
    {this.#renderFilmCard(this.#movies[i]);}
  }

  #onShowMoreButtonClick = () => {
    this.#movies
      .slice(this.#renderedMoviesCount, this.#renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => this.#renderFilmCard(movie));

    this.#renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (this.#renderedMoviesCount >= this.#movies.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleMovieChange = (updatedMovie) => {
    this.#movies = updateItem(this.#movies, updatedMovie);
    this.#filmPresenter.get(updatedMovie.id).init(updatedMovie);
  }

  #renderFilmCard = (movie) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#handleMovieChange);
    filmPresenter.init(movie);
    this.#filmPresenter.set(movie.id, filmPresenter);
  };
}
