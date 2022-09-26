import {remove, render, replace} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';
import CommentsModel from '../model/comments-model.js';

const siteBodyElement = document.querySelector('body');
const footerElement = document.querySelector('.footer');

export default class FilmPresenter {
    #filmCardComponent = null;
    #filmsListContainerComponent = null;
    #movie = null;

    constructor (filmsListContainerComponent) {
        this.#filmsListContainerComponent = filmsListContainerComponent;
    }

    init = (movie) => {
        this.#movie = movie;
        const prevFilmCardComponent = this.#filmCardComponent;

        this.#filmCardComponent = new FilmCardView(movie);
                
        // доопределить презентер на попап
        this.#filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
            this.#showPopup(movie);
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
    }

    #onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          this.#hidePopup();
          document.removeEventListener('keydown', this.#onEscKeyDown);
        }
      };

    #onWishListClick = () => {
        console.log(`current wish list ${this.#movie.user_details.wishlist}`);
        this.#movie.user_details.wishlist = !this.#movie.user_details.wishlist;
        console.log(`new wish list ${this.#movie.user_details.wishlist}`);
    }
    #onWatchedClick = () => {
        console.log(`current watched ${this.#movie.user_details.alreadyWatched}`);
        this.#movie.user_details.alreadyWatched = !this.#movie.user_details.alreadyWatched;
        console.log(`new watched ${this.#movie.user_details.alreadyWatched}`);
    }

    #onFavouriteClick = () => {
        console.log(`current favourite ${this.#movie.user_details.favorite}`);
        this.#movie.user_details.favorite = !this.#movie.user_details.favorite;
        console.log(`new favourite ${this.#movie.user_details.favorite}`);
    }


    #showPopup = (movie) => {
        const popupPresenter = new PopupPresenter();
        const commentsModel = new CommentsModel();
        this.#hidePopup();
        popupPresenter.init(footerElement, movie, commentsModel);
        siteBodyElement.classList.add('hide-overflow');
      };
    
      #hidePopup = () => {
        const popupElement = document.querySelector('.film-details');
        if (popupElement) {popupElement.remove();}
        siteBodyElement.classList.remove('hide-overflow');
      };
}