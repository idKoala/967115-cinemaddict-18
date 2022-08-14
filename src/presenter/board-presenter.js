import {render} from '../render.js';
import NewBoard from '../view/board-view.js';
import FilmsList from '../view/films-list-view.js';
import FilmsListContainer from '../view/films-list-container-view.js';
import ShowMoreButton from '../view/show-more-button-view.js';
import FilmCard from '../view/film-card-view.js';

export default class BoardPresenter {
  boardComponent = new NewBoard();
  filmsListComponent = new FilmsList();
  filmsListContainerComponent = new FilmsListContainer();

  init (boardContainer) {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(this.filmsListComponent, this.boardComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    render(new ShowMoreButton(), this.filmsListComponent.getElement()); //кнопку можно включить в FilmsListContainer, будет на одну вьюшку меньше

    for(let i = 0; i < 5; i++) {
      render(new FilmCard(), this.filmsListContainerComponent.getElement());
    }

  }
}
