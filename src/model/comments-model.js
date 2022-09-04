import {generateComment} from '../mock/comment.js';

export default class CommentsModel {
  comments = Array.from({length: 33}, generateComment);

  getComments = () => this.comments;
}
