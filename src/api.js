import {HttpMethod, HtppStatusCode} from './const.js';
import Card from './models/card.js';
import Comment from './models/comment.js';

const checkStatus = (response) => {
  if (response.status >= HtppStatusCode.SUCCESS && response.status < HtppStatusCode.REDIRECT) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.text}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getCards() {
    return this._load({url: `movies`})
    .then((response) => response.json())
    .then(Card.parseCards);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  updateCard(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: HttpMethod.PUT,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Card.parseCard);
  }

  createComment(movieId, comment) {
    return this._load({
      url: `comments/${movieId}`,
      method: HttpMethod.POST,
      body: JSON.stringify(comment.toRaw()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then((json) => Comment.parseComments(json.comments));
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: HttpMethod.DELETE});
  }

  _load({url, method = HttpMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
};

export default API;
