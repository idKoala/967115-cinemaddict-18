import {render, RenderPosition} from '../render.js';
import PopupView from '../view/popup-view.js';
import FilmDetailsTopView from '../view/film-details-top-view.js';
import FilmDetailsInnerView from '../view/film-details-inner-view.js';
import FilmDetailsBottomView from '../view/film-details-bottom-view.js';
import FilmDetailsCloseButtonView from '../view/film-details-close-button-view.js';
import FilmDetailsInfoView from '../view/film-details-info-view.js';
import FilmDetailsControlsView from '../view/film-details-controls-view.js';
import FilmDetailsCommentsView from '../view/film-details-comments-view.js';
import FilmDetailsCommentsListView from '../view/film-details-comments-list-view.js';
import FilmDetailsNewCommentView from '../view/film-details-new-comment-view.js';

export default class PopupPresenter {
  popupComponent = new PopupView();
  filmDetailsInnerComponent = new FilmDetailsInnerView();
  filmDetailsTopComponent = new FilmDetailsTopView();
  filmDetailsBottomComponent = new FilmDetailsBottomView();
  filmDetailsCommentsComponent = new FilmDetailsCommentsView();

  init (popupContainer) {
    this.popupContainer = popupContainer;

    render(this.popupComponent, this.popupContainer, RenderPosition.AFTEREND);
    render(this.filmDetailsInnerComponent, this.popupComponent.getElement());
    render(this.filmDetailsTopComponent, this.filmDetailsInnerComponent.getElement());
    render(this.filmDetailsBottomComponent, this.filmDetailsInnerComponent.getElement());

    render(new FilmDetailsCloseButtonView(), this.filmDetailsTopComponent.getElement());
    render(new FilmDetailsInfoView(), this.filmDetailsTopComponent.getElement());
    render(new FilmDetailsControlsView(), this.filmDetailsTopComponent.getElement());

    render(this.filmDetailsCommentsComponent, this.filmDetailsBottomComponent.getElement());
    render(new FilmDetailsCommentsListView(), this.filmDetailsBottomComponent.getElement());
    render(new FilmDetailsNewCommentView(), this.filmDetailsBottomComponent.getElement());
  }
}

