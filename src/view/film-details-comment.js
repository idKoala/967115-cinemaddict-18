import AbstractView from '../framework/view/abstract-view.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getDateTimeFromDate} from '../utils.js';

const createFilmDetailsCommentTemplate = (userComment) => {
  const {author, comment, date, emotion, isDeleting, isDisabled} = userComment;

  return `
    <li class="film-details__comment">
    <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getDateTimeFromDate(date)}</span>
        <button class="film-details__comment-delete" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
    </p>
    </div>
    </li>   
`;};

export default class FilmDetailsCommentView extends AbstractStatefulView {
  #comment = null;

  constructor (comment) {
    super();
    this.#comment = comment;
    this._state = FilmDetailsCommentView.parseCommentToState(comment);
  }

  get template () {
    return createFilmDetailsCommentTemplate(this._state);
  }

  senOnDeleteClick = (callback) => {
    this._callback.deleteClick = callback;
    this.element
      .querySelector('.film-details__comment-delete')
      .addEventListener('click', this.#onDeleteClick);
  };

  #onDeleteClick = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this.#comment);
  };

  static parseCommentToState = (comment) => ({
    ...comment,
    isDisabled: false,
    isDeleting: false
  });

  _restoreHandlers = () => {
    this.senOnDeleteClick(this._callback.deleteClick);
  };

}
