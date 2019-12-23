import {createElement} from '../utils.js';

/**
 * Создает html-код доп.блока фильмов по шаблону
 * @param {string} title название блока
 * @return {string} html-код доп.блока
 */
const createSpecialListTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container  ${title.substring(0, 3).toLowerCase()}-container"></div>
    </section>`
  );
};

export default class SpecialList {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return createSpecialListTemplate(this._title);
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
