import {remove, render, replace} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import CommentsModel from '../model/comments-model.js';
import {UserAction, UpdateType} from '../const.js';
import CommentsApiService from '../comments-api-service.js';
import {END_POINT, AUTORIZATION} from '../const.js';

const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('.footer');

export default class FilmPresenter {
  #filmCardComponent = null;
  #filmsListContainerComponent = null;
  #movie = null;
  #movieModel = null;
  #changeMovieData = null;
  #commentsModel = null;
  #popupPresenter = null;

  constructor (filmsListContainerComponent, changeMovieData, movieModel) {
    this.#filmsListContainerComponent = filmsListContainerComponent;
    this.#changeMovieData = changeMovieData;
    this.#movieModel = movieModel;
  }

  init = (movie) => {
    this.#movie = movie;
    const prevFilmCardComponent = this.#filmCardComponent;
    this.#filmCardComponent = new FilmCardView(this.#movie);

    this.#filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      this.#showPopup(this.#movie);
      document.addEventListener('keydown', this.#onEscKeyDown);
      document.querySelector('.film-details__close-btn').addEventListener('click', () => {
        this.#hidePopup();
      });
    });
    this.#filmCardComponent.setOnWishListClick(this.#onWishListClick);
    this.#filmCardComponent.setOnWatchedClick(this.#onWatchedClick);
    this.#filmCardComponent.setOnFavouriteClick(this.#onFavouriteClick);

    if (prevFilmCardComponent === null){
      render(this.#filmCardComponent, this.#filmsListContainerComponent);
      return;
    }

    if (this.#filmsListContainerComponent.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    remove(prevFilmCardComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#hidePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #onWishListClick = () => {
    this.#changeMovieData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, user_details: {...this.#movie.user_details, wishlist: !this.#movie.user_details.wishlist}}
    );
  };

  #onWatchedClick = () => {
    this.#changeMovieData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, user_details: {...this.#movie.user_details, alreadyWatched: !this.#movie.user_details.alreadyWatched}}
    );
  };

  #onFavouriteClick = () => {
    this.#changeMovieData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie, user_details: {...this.#movie.user_details, favorite: !this.#movie.user_details.favorite}}
    );
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        this.#popupPresenter.setDeleting(update);
        try {
          await this.#commentsModel.deleteComment(updateType, update);
        } catch(err) {
          this.#popupPresenter.setAborting(update);
        }


        const index = this.#movie.comments.indexOf(update.id);
        this.#movie.comments = [
          ...this.#movie.comments.slice(0, index),
          ...this.#movie.comments.slice(index + 1)
        ];
        this.#movieModel.updateMovie(updateType, this.#movie);
        break;
      case UserAction.ADD_COMMENT:
        this.#popupPresenter.setSaving();
        try {
          await this.
            #commentsModel.
            addComment(updateType, update, this.#movie)
            .then((movie) => this.#movieModel.convertToClientFormat(movie))
            .then((movie) => this.#movieModel.updateMovie(updateType, movie));
        } catch(err) {
          this.#popupPresenter.setSavingAborting();
        }
        break;
    }
  };

  #showPopup = (movie) => {
    this.#commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTORIZATION), movie);
    this.#commentsModel.init();
    this.#popupPresenter = new PopupPresenter(
      footerElement,
      movie,
      this.#commentsModel,
      this.#onWishListClick,
      this.#onWatchedClick,
      this.#onFavouriteClick,
      this.#handleViewAction);
    this.#hidePopup();
    this.#popupPresenter.init();
    siteBodyElement.classList.add('hide-overflow');
  };

  #hidePopup = () => {
    const popupElement = document.querySelector('.film-details');
    if (popupElement) {popupElement.remove();}
    siteBodyElement.classList.remove('hide-overflow');
  };
}
