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
