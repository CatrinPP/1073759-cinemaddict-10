import FilterComponent from '../components/filter.js';
import {render, RenderPosition} from '../utils/render.js';
import {getFilterCount} from '../utils/common.js';

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const filtersCounts = {
      watchlistCount: 0,
      historyCount: 0,
      favoritesCount: 0,
    };

    const allMovies = this._moviesModel.getMovies();

    filtersCounts.watchlistCount = getFilterCount(allMovies, `isAddedToWatchlist`);
    filtersCounts.historyCount = getFilterCount(allMovies, `isWatched`);
    filtersCounts.favoritesCount = getFilterCount(allMovies, `isFavorite`);

    render(this._container, new FilterComponent(filtersCounts), RenderPosition.BEFOREEND);
  }
}
