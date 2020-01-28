import {HttpMethod} from './const.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
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

  // getCards() {
  // }

  // createCard(card) {
  // }

  // updateCard(id, data) {
  // }

  // deleteCard(id) {
  // }

  _load({url, method = HttpMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Auhtorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((error) => {
        throw error;
      });
  }
};

export default API;
