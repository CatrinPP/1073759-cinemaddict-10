import {FilterType} from '../const.js';

export default class Movie {
  constructor() {
    this._cards = [];
    this._activeFilterType = FilterType.ALL;
  }

  getMovies() {
    return this._getMoviesByFilter(this._cards, this._activeFilterType);
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

  setFilter(filterType) {
    this._activeFilterType = filterType;
  }

  _getFilteredMovies(movies, property) {
    return movies.filter((movie) => movie[property]);
  }

  _getMoviesByFilter(movies, filterType) {
    switch (filterType) {
      case FilterType.ALL:
        return movies;
      case FilterType.WATCHLIST:
        return this._getFilteredMovies(movies, `isAddedToWatchlist`);
      case FilterType.HISTORY:
        return this._getFilteredMovies(movies, `isWatched`);
      case FilterType.FAVORITES:
        return this._getFilteredMovies(movies, `isFavorite`);
    }

    return movies;
  }
}
