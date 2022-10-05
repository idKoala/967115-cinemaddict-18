import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const BLANK_COMMENT = {
  'author': null,
  'comment': null,
  'date': null,
  'emotion': null,

};

const createEmojiImageTemplate = (emoji) => emoji === null ? '' : `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
const createCommentTextTemplate = (text) => text === null ? '' : text;

const createFilmDetailsNewCommentTemplate = (data) => {
  const {emotion, comment, isDisabled} = data;

  return `
<form class="film-details__new-comment" action="" method="get" ${isDisabled ? 'disabled' : ''}>
          <div class="film-details__add-emoji-label">${createEmojiImageTemplate(emotion)}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${createCommentTextTemplate(comment)}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>`;};

export default class FilmDetailsNewCommentView extends AbstractStatefulView{

  get template () {
    return createFilmDetailsNewCommentTemplate(this._state);
  }

  constructor (comment = BLANK_COMMENT) {
    super();
    this._state = FilmDetailsNewCommentView.parseCommentToState(comment);
    this.#setInnerHandlers();

  }

  static parseCommentToState = (comment) => ({...comment,
    isDisabled: false,
  });

  #onEmojiClick = (evt) => {
    this.updateElement({
      'emotion': evt.target.value
    });
  };

  #setInnerHandlers = () => {
    this.element
      .querySelectorAll('[name="comment-emoji"]')
      .forEach((emoji) => emoji.addEventListener('change', this.#onEmojiClick));
    this.element.querySelector('.film-details__comment-label').addEventListener('input', this.#onCommentInput);
  };

  #onCommentInput = (evt) => {
    evt.preventDefault();
    this._setState({
      'comment': evt.target.value
    });
  };

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      this._callback.formSubmit(this.#stateToLocalComment());
    }
  };

  setOnFormSubmit = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('keyup', this.#onFormSubmit);
  };

  #stateToLocalComment = () => {
    const lc = {
      comment: this._state.comment,
      emotion: this._state.emotion
    };

    return lc;
  };


  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setOnFormSubmit(this._callback.formSubmit);
  };
}
