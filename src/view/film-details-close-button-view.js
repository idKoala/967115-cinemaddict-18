import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsCloseButtonTemplate = () => `
<div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>`;

export default class FilmDetailsCloseButtonView extends AbstractView{
  get template () {
    return createFilmDetailsCloseButtonTemplate();
  }
}
