/**
 * Создает html-код карточки фильма по шаблону
 * @param  {object} card {объект структуры карточки фильма}
 * @return {string} {html-код карточки фильма}
 */
const createFilmCardTemplate = (card) => {
  const {title, rating, year, duration, genres, poster, description, comments, isAddedToWatchlist, isWatched, isFavorite} = card;

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
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddedToWatchlist ? `film-card__controls-item--active` : null}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? `film-card__controls-item--active` : null}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : null}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardTemplate};
