import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class CommentsApiService extends ApiService {
  
  // метод получения всех комментариев не нужен. Будет вызываться следующий по id фильма
  get comments() {
    return this._load({url: `comments`})
      .then(ApiService.parseResponse);
  }

  getComments = async (movie) => {
    return this._load({url: `comments/${movie.id}`})
        .then(ApiService.parseResponse);
  }

  writeComment = async (comments, movie) => {
    const response = await this._load({
        url: `comments/${movie.id}`,
        method: Method.POST,
        body: JSON.stringify({movie, comments}), // формат под вопросом
        headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  deleteComment = async (comment) => {
    const response = await this._load({
        url: `comments/${comment.id}`,
        method: Method.DELETE,
        // нужны ли заголовки с типом, если нет контента
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}