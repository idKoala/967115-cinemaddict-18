import {render} from './render.js';
import MenuView from './view/menu-view.js';
import UserRating from './view/user-rating-view.js';
import FilmsCounter from './view/films-counter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import SortView from './view/sort-view.js';

const siteMainElement = document.querySelector('.main');
const profileElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const boardPresenter = new BoardPresenter();

render(new MenuView(), siteMainElement);
render(new UserRating(), profileElement);
render(new SortView(), siteMainElement);
render(new FilmsCounter(), footerElement);

boardPresenter.init(siteMainElement);
