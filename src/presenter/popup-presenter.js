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
  #onWishListClick = null;
  #onWatchedClick = null;
  #onFavouriteClick = null;
  #filmDetailsControlsComponent = null;


  constructor (
    popupContainer,
    movieData,
    commentsModel,
    onWishListClick,
    onWatchedClick,
    onFavouriteClick)
  {
    this.#popupContainer = popupContainer;
    this.#popupMovie = movieData;
    this.#commentsModel = commentsModel;
    this.#onWishListClick = onWishListClick;
    this.#onWatchedClick = onWatchedClick;
    this.#onFavouriteClick = onFavouriteClick;
  }

  init () {
    this.#comments = [...this.#commentsModel.comments];
    this.#renderPopup();

  }

  #renderPopup = () => {
    render(this.#popupComponent, this.#popupContainer, RenderPosition.AFTEREND);
    render(this.#filmDetailsInnerComponent, this.#popupComponent.element);
    render(this.#filmDetailsTopComponent, this.#filmDetailsInnerComponent.element);
    render(this.#filmDetailsBottomComponent, this.#filmDetailsInnerComponent.element);

    this.#renderFilmDetailsCloseButton();
    this.#renderFilmDetailsInfo();
    this.#renderFilmDetailsControls();
    this.#renderFilmDetailsComments();
    this.#renderFilmDetailsNewComment();

  };

  #renderFilmDetailsCloseButton = () => {
    render(this.#filmDetailsCloseButtonComponent, this.#filmDetailsTopComponent.element);
  };

  #renderFilmDetailsInfo = () => {
    render(new FilmDetailsInfoView(this.#popupMovie), this.#filmDetailsTopComponent.element);
  };

  #renderFilmDetailsControls = () => {
    this.#filmDetailsControlsComponent = new FilmDetailsControlsView(this.#popupMovie);
    this.#filmDetailsControlsComponent.setOnWishListClick(this.#onWishListClick);
    this.#filmDetailsControlsComponent.setOnWatchedClick(this.#onWatchedClick);
    this.#filmDetailsControlsComponent.setOnFavouriteClick(this.#onFavouriteClick);

    render(this.#filmDetailsControlsComponent, this.#filmDetailsTopComponent.element);

  };

  #renderFilmDetailsComment = (comment) => {
    render(new FilmDetailsCommentView(comment), this.#filmDetailsCommentsListComponent.element);
  };

  #renderFilmDetailsComments = () => {
    render(new FilmDetailsCommentsView(this.#popupMovie), this.#filmDetailsBottomComponent.element);
    render(this.#filmDetailsCommentsListComponent, this.#filmDetailsBottomComponent.element);

    this.#comments.forEach((comment) => {
      this.#renderFilmDetailsComment(comment);
    });
  };

  #renderFilmDetailsNewComment = () => {
    render(new FilmDetailsNewCommentView(), this.#filmDetailsBottomComponent.element);
  };
}

