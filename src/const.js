const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const CARDS_COUNT_ADDITIONAL = 2;
const ESC_KEYCODE = 27;
const ENTER_KEYCODE = 13;
const AUTHORIZATION = `Basic lYu8gIdsz2317rD`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const HtppStatusCode = {
  SUCCESS: 200,
  REDIRECT: 300,
  CLIENT_ERROR: 400,
};

const RATING = [
  `Novice`,
  `Fan`,
  `Movie Buff`,
];

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export {
  RATING,
  SHOWING_CARDS_COUNT_BY_BUTTON,
  SHOWING_CARDS_COUNT_ON_START,
  CARDS_COUNT_ADDITIONAL,
  ESC_KEYCODE,
  ENTER_KEYCODE,
  FilterType,
  HttpMethod,
  HtppStatusCode,
  AUTHORIZATION,
  END_POINT,
};
