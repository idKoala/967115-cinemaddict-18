import {generateComments} from '../mock/comment.js';

export default class CommentsModel {
  #comments = generateComments();

  get comments () {return this.#comments;}
}
