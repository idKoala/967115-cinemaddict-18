import {render} from './render.js';
import MenuView from './view/menu-view.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsCounterView from './view/films-counter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import SortView from './view/sort-view.js';
import MoviesModel from './model/movies-model.js';

const siteMainElement = document.querySelector('.main');
const profileElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const moviesModel = new MoviesModel();
const movies = [...moviesModel.movies];
const boardPresenter = new BoardPresenter(siteMainElement, moviesModel);

render(new MenuView(), siteMainElement);
render(new UserRatingView(), profileElement);
render(new SortView(), siteMainElement);
render(new FilmsCounterView(movies), footerElement);

boardPresenter.init();
