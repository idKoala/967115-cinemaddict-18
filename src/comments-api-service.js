import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class CommentsApiService extends ApiService {

  // метод получения всех комментариев не нужен. Будет вызываться следующий по id фильма
  // get comments() {
  //   return this._load({url: 'comments'})
  //     .then(ApiService.parseResponse);
  // }

  getComments = async (movie) => this._load({url: `comments/${movie.id}`})
    .then(ApiService.parseResponse);

  addComment = async (comment, movie) => {
    const response = await this._load({
      url: `comments/${movie.id}`,
      method: Method.POST,
      body: JSON.stringify(comment), // формат под вопросом
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);
    
    return parsedResponse;

    // return response;
  };

  deleteComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  };
}
