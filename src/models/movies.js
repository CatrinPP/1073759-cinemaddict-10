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

  updateMovie(id, card) {
    const index = this._cards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._cards.splice(index, 1, card);

    return true;
  }
}
