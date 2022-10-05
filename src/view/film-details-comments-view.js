import AbstractView from '../framework/view/abstract-view.js';

const createFilmDetailsCommentsTemplate = (comments) => `
<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
</section>`;

export default class FilmDetailsCommentsView extends AbstractView {
  #comments = null;

  constructor (comments) {
    super();
    this.#comments = comments;
  }

  get template () {
    return createFilmDetailsCommentsTemplate(this.#comments);
  }
}
