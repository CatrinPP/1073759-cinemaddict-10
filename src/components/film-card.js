import AbstractComponent from './abstract-component.js';

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    const {title, rating, year, duration, genres, poster, description, comments, isAddedToWatchlist, isWatched, isFavorite} = this._card;
    let shortDescription = description;
    if (description.length > 139) {
      shortDescription = `${description.substr(0, 139)}...`;
    }

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src=${poster} alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddedToWatchlist ? `film-card__controls-item--active` : null}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : null}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : null}">Mark as favorite</button>
        </form>
      </article>`
    );
  }

  bind(onCardClick, onFavoritesButtonClick, onWatchedButtonClick, onWatchListButtonClick) {
    const cover = this.getElement().querySelector(`.film-card__poster`);
    const title = this.getElement().querySelector(`.film-card__title`);
    const comments = this.getElement().querySelector(`.film-card__comments`);
    cover.style = `cursor:pointer`;
    title.style = `cursor:pointer`;
    cover.addEventListener(`click`, onCardClick);
    title.addEventListener(`click`, onCardClick);
    comments.addEventListener(`click`, onCardClick);

    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, onFavoritesButtonClick);

    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, onWatchedButtonClick);

    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, onWatchListButtonClick);
  }
}

