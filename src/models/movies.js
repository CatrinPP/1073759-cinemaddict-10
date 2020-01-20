export default class Movie {
  constructor() {
    this._cards = [];
  }

  getMovies() {
    return this._cards;
  }

  setMovies(cards) {
    this._cards = Array.from(cards);
  }
}
