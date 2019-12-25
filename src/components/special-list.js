import {createElement} from '../utils.js';

export default class SpecialList {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">${this._title}</h2>

        <div class="films-list__container  ${this._title.substring(0, 3).toLowerCase()}-container"></div>
      </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
