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

  addComment = async (updateType, update, movie) => {
    try {
      const response = await this.#commentsApiService.addComment(update, movie);
      this.#comments = response.comments;
      const updatedMovie = response.movie;
      this._notify(updateType, update);
      return updatedMovie;
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
    
  };

  deleteComment = async (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(update);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1)
      ];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };
}
