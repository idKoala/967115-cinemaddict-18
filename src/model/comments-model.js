import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #movie = null;
  #comments = [];

  constructor (commentsApiService, movie) {
    super();
    this.#commentsApiService = commentsApiService;
    this.#movie = movie;
  }

  init = async () => {
    try {
      this.#comments = await this.#commentsApiService.getComments(this.#movie);
      console.log('INIT COMMENTS', this.#comments);
    } catch(err) {
      this.#comments =[];
    }
  }

  get comments () {return this.#comments;}

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments
    ];
    
    this._notify(updateType, update);
  }

  deleteComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = {
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1)
    };

    this._notify(updateType, update);
  }
}
