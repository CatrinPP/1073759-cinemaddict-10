import AbstractSmartComponent from './abstract-smart-component.js';
import moment from 'moment';

export default class Comment extends AbstractSmartComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    const {author, text, emoji, date} = this._comment;

    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${emoji}" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${moment(date).format(`YYYY/MM/DD HH:MM`)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }

  bind(onDeleteButtonClick) {
    this.getElement().querySelector(`.film-details__comment-delete`)
      .addEventListener(`click`, onDeleteButtonClick);
  }
}
