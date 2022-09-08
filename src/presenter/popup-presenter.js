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
  popupComponent = new PopupView();
  filmDetailsInnerComponent = new FilmDetailsInnerView();
  filmDetailsTopComponent = new FilmDetailsTopView();
  filmDetailsBottomComponent = new FilmDetailsBottomView();
  filmDetailsCommentsComponent = new FilmDetailsCommentsView();
  filmDetailsCommentsListComponent = new FilmDetailsCommentsListView();

  init (popupContainer, popupMovie, commentsModel) {
    this.popupContainer = popupContainer;
    this.popupMovie = popupMovie;
    this.commentsModel = commentsModel;
    this.comments = [...this.commentsModel.getComments()];

    render(this.popupComponent, this.popupContainer, RenderPosition.AFTEREND);
    render(this.filmDetailsInnerComponent, this.popupComponent.getElement());
    render(this.filmDetailsTopComponent, this.filmDetailsInnerComponent.getElement());
    render(this.filmDetailsBottomComponent, this.filmDetailsInnerComponent.getElement());

    render(new FilmDetailsCloseButtonView(), this.filmDetailsTopComponent.getElement());
    render(new FilmDetailsInfoView(this.popupMovie), this.filmDetailsTopComponent.getElement());
    render(new FilmDetailsControlsView(), this.filmDetailsTopComponent.getElement());

    render(this.filmDetailsCommentsComponent, this.filmDetailsBottomComponent.getElement());
    render(this.filmDetailsCommentsListComponent, this.filmDetailsBottomComponent.getElement());
    for (let i = 0; i < this.comments.length; i++) {
      render(new FilmDetailsCommentView(this.comments[i]), this.filmDetailsCommentsListComponent.getElement());
    }

    render(new FilmDetailsNewCommentView(), this.filmDetailsBottomComponent.getElement());
  }
}

