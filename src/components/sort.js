import AbstractComponent from './abstract-component.js';

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
    this._sortButtons = this.getElement().querySelectorAll(`.sort__button`);
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
        <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
      </ul>`
    );
  }

  bind(onChangeSortType) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      this._sortButtons.forEach((it) => it.classList.remove(`sort__button--active`));
      evt.target.classList.add(`sort__button--active`);

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      onChangeSortType(this._currentSortType);
    });
  }
}
