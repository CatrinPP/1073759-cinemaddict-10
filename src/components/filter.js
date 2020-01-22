import AbstractComponent from './abstract-component.js';
import {FilterType} from '../const.js';

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._filterLinks = this.getElement().querySelectorAll(`.main-navigation__item:not(:last-child)`);
    this._activeFilterType = FilterType.ALL;
  }

  getTemplate() {
    const {watchlistCount, historyCount, favoritesCount} = this._filters;

    return (
      `<nav class="main-navigation">
        <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
        <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
        <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
      </nav>`
    );
  }

  bind(onFilterChange) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A` || evt.target.textContent === `Stats`) {
        return;
      }

      this._filterLinks.forEach((it) => it.classList.remove(`main-navigation__item--active`));
      evt.target.classList.add(`main-navigation__item--active`);

      const filterType = evt.target.dataset.filterType;

      if (this.__activeFilterType === filterType) {
        return;
      }

      this._activeFilterType = filterType;

      onFilterChange(this._activeFilterType);
    });
  }
}
