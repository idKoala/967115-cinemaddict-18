import {render} from './render.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsCounterView from './view/films-counter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import MoviesModel from './model/movies-model.js';
import MenuView from './view/menu-view.js';
import {generateFilter} from './mock/filter.js';

const siteMainElement = document.querySelector('.main');
const profileElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');

const moviesModel = new MoviesModel();
const movies = [...moviesModel.movies];
const boardPresenter = new BoardPresenter(siteMainElement, moviesModel);

const filters = generateFilter(movies);
render(new MenuView(filters), siteMainElement);

render(new UserRatingView(), profileElement);
render(new FilmsCounterView(movies), footerElement);

boardPresenter.init();
