import {render} from '../render.js';
import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import CommentsModel from '../model/comments-model.js';

const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('.footer');


export default class BoardPresenter {
  #boardComponent = new BoardView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #boardContainer = null;
  #moviesModel = null;
  #movies = null;


  init (boardContainer, moviesModel) {
    this.#boardContainer = boardContainer;
    this.#moviesModel = moviesModel;
    this.#movies = [...this.#moviesModel.movies];

    render(this.#boardComponent, this.#boardContainer);
    render(this.#filmsListComponent, this.#boardComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    render(new ShowMoreButtonView(), this.#filmsListComponent.element);

    this.#movies.forEach((movie) => {this.#renderFilmCard(movie);});

  }

  #renderFilmCard = (movie) => {
    const filmCardComponent = new FilmCardView(movie);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#hidePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };


    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#showPopup(movie);
      document.addEventListener('keydown', onEscKeyDown);
      document.querySelector('.film-details__close-btn').addEventListener('click', () => {
        this.#hidePopup();
      });
    });

    render(filmCardComponent, this.#filmsListContainerComponent.element);
  };

  #showPopup = (movie) => {
    const popupPresenter = new PopupPresenter();
    const commentsModel = new CommentsModel();
    this.#hidePopup();
    popupPresenter.init(footerElement, movie, commentsModel);
    siteBodyElement.classList.add('hide-overflow');
  };

  #hidePopup = () => {
    const popupElement = document.querySelector('.film-details');
    if (popupElement) {popupElement.remove();}
    siteBodyElement.classList.remove('hide-overflow');
  };
}
