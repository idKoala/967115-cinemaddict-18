import {createElement} from '../render.js';
import {getDateTimeFromDate} from '../utils.js';

const createFilmDetailsCommentTemplate = (userCcomment) => {
  const {author, comment, date, emotion} = userCcomment;

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
        <button class="film-details__comment-delete">Delete</button>
    </p>
    </div>
    </li>   
`;};

export default class FilmDetailsCommentView {
  #element = null;
  #comment = null;

  constructor (comment) {
    this.#comment = comment;
  }

  get template () {
    return createFilmDetailsCommentTemplate(this.#comment);
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
