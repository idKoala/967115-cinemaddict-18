import {render} from './render.js';
import MenuView from './view/menu-view.js';
import UserRatingView from './view/user-rating-view.js';
import FilmsCounterView from './view/films-counter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import SortView from './view/sort-view.js';

const siteMainElement = document.querySelector('.main');
const profileElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer');
const boardPresenter = new BoardPresenter();
const popupPresenter = new PopupPresenter();

render(new MenuView(), siteMainElement);
render(new UserRatingView(), profileElement);
render(new SortView(), siteMainElement);
render(new FilmsCounterView(), footerElement);

boardPresenter.init(siteMainElement);
popupPresenter.init(footerElement);
