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
import {remove} from '../framework/render.js';
import {UpdateType, UserAction} from '../const.js';

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
  #changeCommentData = null;
  #filmDetailsControlsComponent = null;
  #filmDetailsNewCommentComponent = null;
  #filmDetailsCommentsComponent = null;
  #isLoading = true;

  constructor (
    popupContainer,
    movieData,
    commentsModel,
    onWishListClick,
    onWatchedClick,
    onFavouriteClick,
    changeCommentData)
  {
    this.#popupContainer = popupContainer;
    this.#popupMovie = movieData;
    this.#commentsModel = commentsModel;
    this.#onWishListClick = onWishListClick;
    this.#onWatchedClick = onWatchedClick;
    this.#onFavouriteClick = onFavouriteClick;
    this.#changeCommentData = changeCommentData;
  }

  init () {
    this.#comments = this.#commentsModel.comments;
    this.#renderPopup();

    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
  }

  #handleCommentsModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.COMMENTS_INIT:
        this.#isLoading = false;
        this.#renderComments();
        break;
      case UpdateType.COMMENT_DELETE:
        console.log('comment is deletes', data.id);
        break;
    }
  };

  #handleDeleteClick = (comment) => {
    console.log('click', comment.id);
    this.#changeCommentData (
      UserAction.DELETE_COMMENT,
      UpdateType.COMMENT_DELETE,
      comment
    )
  }

  // #handleCommentModelEvent = (updateType, data) => {
  //   switch (updateType) {
  //     case UpdateType.COMMENT_DELETE:
  //       // перерисовать комментарии
  //       break;
  //   }
  // }

  #renderPopup = () => {
    render(this.#popupComponent, this.#popupContainer, RenderPosition.AFTEREND);
    render(this.#filmDetailsInnerComponent, this.#popupComponent.element);
    render(this.#filmDetailsTopComponent, this.#filmDetailsInnerComponent.element);
    render(this.#filmDetailsBottomComponent, this.#filmDetailsInnerComponent.element);

    this.#renderFilmDetailsCloseButton();
    this.#renderFilmDetailsInfo();
    this.#renderFilmDetailsControls();

  };

  #renderComments = () => {
    if (this.#isLoading) {
      return;
    }

    this.#renderFilmDetailsComments();
    this.#renderFilmDetailsNewComment();
  };

  #renderFilmDetailsCloseButton = () => {
    render(this.#filmDetailsCloseButtonComponent, this.#filmDetailsTopComponent.element);
  };

  #renderFilmDetailsInfo = () => {
    render(new FilmDetailsInfoView(this.#popupMovie), this.#filmDetailsTopComponent.element);
  };

  destroy = () => {
    remove(this.#popupComponent);
    this.#renderPopup();
  };

  #renderFilmDetailsControls = () => {
    this.#filmDetailsControlsComponent = new FilmDetailsControlsView(this.#popupMovie);
    this.#filmDetailsControlsComponent.setOnWishListClick(this.#onWishListClick);
    this.#filmDetailsControlsComponent.setOnWatchedClick(this.#onWatchedClick);
    this.#filmDetailsControlsComponent.setOnFavouriteClick(this.#onFavouriteClick);

    render(this.#filmDetailsControlsComponent, this.#filmDetailsTopComponent.element);

  };

  // В комментарий еще нужно передать обработчик на кнопку удаления
  #renderFilmDetailsComment = (comment) => {
    const filmDetailsCommentView = new FilmDetailsCommentView(comment);
    filmDetailsCommentView.senOnDeleteClick(this.#handleDeleteClick);
    render(filmDetailsCommentView, this.#filmDetailsCommentsListComponent.element);
  };

  #renderFilmDetailsComments = () => {
    const comments = this.#commentsModel.comments;
    this.#filmDetailsCommentsComponent = new FilmDetailsCommentsView(this.#popupMovie);
    render(this.#filmDetailsCommentsComponent, this.#filmDetailsBottomComponent.element);
    render(this.#filmDetailsCommentsListComponent, this.#filmDetailsBottomComponent.element);

    comments.forEach((comment) => {
      this.#renderFilmDetailsComment(comment);
    });
  };

  #clearFilmDetailsComments = () => {
    remove(this.#filmDetailsCommentsComponent);
    remove(this.#filmDetailsCommentsListComponent);
  };

  #handleFormSubmit = () => {
    //Заготовка на отправку формы
  };

  #renderFilmDetailsNewComment = () => {

    this.#filmDetailsNewCommentComponent = new FilmDetailsNewCommentView();
    render(this.#filmDetailsNewCommentComponent, this.#filmDetailsBottomComponent.element);
  };

}

