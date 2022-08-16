import {render} from '../render.js';
import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';

const FILM_CARDS_NUMBER = 5;

export default class BoardPresenter {
  boardComponent = new BoardView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init (boardContainer) {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(this.filmsListComponent, this.boardComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    render(new ShowMoreButtonView(), this.filmsListComponent.getElement()); //кнопку можно включить в FilmsListContainer, будет на одну вьюшку меньше

    for(let i = 0; i < FILM_CARDS_NUMBER; i++) {
      render(new FilmCardView(), this.filmsListContainerComponent.getElement());
    }

  }
}
