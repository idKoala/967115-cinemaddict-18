import {render} from '../render.js';
import BoardView from '../view/board-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();

  init (boardContainer, moviesModel) {
    this.boardContainer = boardContainer;
    this.moviesModel = moviesModel;
    this.movies = [...this.moviesModel.getMovies()];

    render(this.boardComponent, this.boardContainer);
    render(this.filmsListComponent, this.boardComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    render(new ShowMoreButtonView(), this.filmsListComponent.getElement()); //кнопку можно включить в FilmsListContainer, будет на одну вьюшку меньше

    for(let i = 0; i < this.movies.length; i++) {
      render(new FilmCardView(this.movies[i]), this.filmsListContainerComponent.getElement());
    }

  }
}
