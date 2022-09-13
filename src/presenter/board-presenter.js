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

    for(let i = 0; i < this.#movies.length; i++) {
      //render(new FilmCardView(this.#movies[i]), this.#filmsListContainerComponent.element);
      this.#renderFilmCard(this.#movies[i]);
    }

  }

  #renderFilmCard = (movie) => {
    const filmCardComponent = new FilmCardView(movie);

    filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#showPopup(movie);
    });

    // навесить событие клика на каждую созданную карты
    // по клику вызвать функцию showPopup с аргументом movie

    render(filmCardComponent, this.#filmsListContainerComponent.element);
  }

  #showPopup = (movie) => {
    console.log('click-click');
    const popupPresenter = new PopupPresenter();
    const commentsModel = new CommentsModel();

    popupPresenter.init(footerElement, movie, commentsModel);
    popupPresenter.querySelector('.film-details__close-btn').addEventListener('click', () => {
      console.log('clise-close');
    });
    //показать попап с фильмом -- создать попап и вставить его в разметку
    //навесить события скрытия попапа -- по кресту и по Esc
    //удалить событие клика по фильму
  }

  #hidePopup = () => {
    //как отобразить и скрыть попап

    //скрыть-удалить попап
    //удалить события закрытия -- по кресту и 
  }
}
