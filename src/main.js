import {render} from './render.js';
import UserRatingView from './view/user-rating-view.js';
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
const filterPresenter = new FilterPresenter(siteMainElement, profileElement, filterModel, moviesModel);
const boardPresenter = new BoardPresenter(siteMainElement, footerElement, moviesModel, filterModel);


filterPresenter.init();
boardPresenter.init();
moviesModel.init();
// render(new UserRatingView(moviesModel), profileElement);
