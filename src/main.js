import {render} from './render.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsCounterView from './view/films-counter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteMainElement = document.querySelector('.main');
const profileElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const movies = [...moviesModel.movies];
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);
const boardPresenter = new BoardPresenter(siteMainElement, moviesModel);

render(new UserRatingView(), profileElement);
render(new FilmsCounterView(movies), footerElement);

filterPresenter.init();
boardPresenter.init();
