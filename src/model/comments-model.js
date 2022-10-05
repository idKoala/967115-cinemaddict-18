import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

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
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.COMMENTS_INIT);
  };

  get comments () {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments
    ];

    this._notify(updateType, update);
  };

  deleteComment = async (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    console.log('model comment update id', update.id);
    console.log('index', index);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(update);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1)
      ];
      console.log('comments after delete', this.#comments);
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };
}
