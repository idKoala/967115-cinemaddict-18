import {render} from './render.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsCounterView from './view/films-counter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MoviesApiService from './movies-api-service.js';
import {END_POINT, AUTORIZATION} from './const.js';

const siteMainElement = document.querySelector('.main');
const profileElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const moviesModel = new MoviesModel(new MoviesApiService(END_POINT, AUTORIZATION));
const filterModel = new FilterModel();
const movies = [...moviesModel.movies];
console.log(`Movies before INIT`, movies);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);
const boardPresenter = new BoardPresenter(siteMainElement, moviesModel, filterModel);

render(new FilmsCounterView(movies), footerElement);
render(new UserRatingView(), profileElement);

filterPresenter.init();
boardPresenter.init();
moviesModel.init();
