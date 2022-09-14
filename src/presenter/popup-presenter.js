import {render, RenderPosition} from '../render.js';
import PopupView from '../view/popup-view.js';
import FilmDetailsTopView from '../view/film-details-top-view.js';
import FilmDetailsInnerView from '../view/film-details-inner-view.js';
import FilmDetailsBottomView from '../view/film-details-bottom-view.js';
import FilmDetailsCloseButtonView from '../view/film-details-close-button-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsCommentsView from '../view/film-details-comments-view.js';
import FilmDetailsCommentView from '../view/film-details-comment.js';
import FilmDetailsCommentsListView from '../view/film-details-comments-list-view.js';
import FilmDetailsNewCommentView from '../view/film-details-new-comment-view.js';

export default class PopupPresenter {
  #popupComponent = new PopupView();
  #filmDetailsInnerComponent = new FilmDetailsInnerView();
  #filmDetailsTopComponent = new FilmDetailsTopView();
  #filmDetailsBottomComponent = new FilmDetailsBottomView();
  #filmDetailsCommentsListComponent = new FilmDetailsCommentsListView();
  #filmDetailsCloseButtonComponent = new FilmDetailsCloseButtonView();
  #popupContainer = null;
  #popupMovie = null;
  #commentsModel = null;
  #comments = null;


  init (popupContainer, popupMovie, commentsModel) {
    this.#popupContainer = popupContainer;
    this.#popupMovie = popupMovie;
    this.#commentsModel = commentsModel;
    this.#comments = [...this.#commentsModel.comments];

    render(this.#popupComponent, this.#popupContainer, RenderPosition.AFTEREND);
    render(this.#filmDetailsInnerComponent, this.#popupComponent.element);
    render(this.#filmDetailsTopComponent, this.#filmDetailsInnerComponent.element);
    render(this.#filmDetailsBottomComponent, this.#filmDetailsInnerComponent.element);

    render(this.#filmDetailsCloseButtonComponent, this.#filmDetailsTopComponent.element);
    render(new FilmDetailsInfoView(this.#popupMovie), this.#filmDetailsTopComponent.element);
    render(new FilmDetailsControlsView(popupMovie), this.#filmDetailsTopComponent.element);

    render(new FilmDetailsCommentsView(popupMovie), this.#filmDetailsBottomComponent.element);
    render(this.#filmDetailsCommentsListComponent, this.#filmDetailsBottomComponent.element);

    this.#comments.forEach((comment) => {
      render(new FilmDetailsCommentView(comment), this.#filmDetailsCommentsListComponent.element);
    });

    render(new FilmDetailsNewCommentView(), this.#filmDetailsBottomComponent.element);
  }
}

