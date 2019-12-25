import SiteMenuComponent from './components/menu.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import PopupComponent from './components/popup.js';
import RatingComponent from './components/rating.js';
import FilmCardComponent from './components/film-card.js';
import FilmsListComponent from './components/films-list.js';
import SpecialListComponent from './components/special-list.js';
import SortComponent from './components/sort.js';
import NoFilmsComponent from './components/no-films.js';
import {generateCards} from './mock/card';
import {getRating, render, RenderPosition, isEscEvent} from './utils.js';
import {SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON, CARDS_COUNT_ADDITIONAL} from './const.js';

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
const siteMainElement = document.querySelector(`.main`);
let filmsCardsContainer = null;
const cards = generateCards();
const topRatedMovies = cards.slice();
const mostCommentedMovies = cards.slice();
const filtersCounts = {
  watchlistCount: 0,
  historyCount: 0,
  favoritesCount: 0,
};

/**
 * Выводит общее количество фильмов в сервисе
 * @param  {number} totalMovies кол-во фильмов
 */
const fillMoviesCount = (totalMovies) => {
  const total = document.querySelector(`.footer__statistics`).querySelector(`p`);
  total.textContent = `${totalMovies} movies inside`;
};

/**
 * Вычисляет кол-во фильмов соответствующих фильтру
 * @param  {string} property свойство карточки фильма под фильтр
 * @return {number} кол-во фильмов соответствующих фильтру
 */
const getFilterCount = (property) => {
  const filter = cards.filter((card) => card[property]);
  return filter.length;
};

/**
 * Сортирует массив фильмов по уменьшению рейтинга
 * @param  {array} arr массив фильмов
 */
const sortByRating = (arr) => {
  arr.sort((a, b) => b.rating - a.rating);
};

/**
 * Сортирует массив фильмов по уменьшению кол-ва комментариев
 * @param  {array} arr массив фильмов
 */
const sortByComments = (arr) => {
  arr.sort((a, b) => b.comments.length - a.comments.length);
};

/**
 * Рендерит хедер на страницу
 */
const renderPageHeader = () => {
  const siteHeaderElement = document.querySelector(`.header`);
  render(siteHeaderElement, new RatingComponent(watchedMoviesCount).getElement(), RenderPosition.BEFOREEND);
  render(siteMainElement, new SiteMenuComponent(filtersCounts).getElement(), RenderPosition.BEFOREEND);
};

/**
 * Генерирует подробную карточку для попапа
 * @param  {object} card    объект карточки фильма
 * @param  {element} newCard элемент карточки фильма
 */
const generateDetailedCard = (card, newCard) => {
  const detailedCard = new PopupComponent(card);
  const cover = newCard.querySelector(`.film-card__poster`);
  const title = newCard.querySelector(`.film-card__title`);
  cover.style = `cursor:pointer`;
  title.style = `cursor:pointer`;
  const comments = newCard.querySelector(`.film-card__comments`);
  const body = document.querySelector(`body`);

  /**
   * Удаляет попап из DOM
   */
  const removePopup = () => {
    detailedCard.removeElement();
    body.querySelector(`.film-details`).remove();
  };

  /**
   * Рендерит попап - детализированное описание фильма
   */
  const renderPopup = () => {
    if (body.querySelector(`.film-details`)) {
      removePopup();
    }

    render(body, detailedCard.getElement(), RenderPosition.BEFOREEND);

    const close = detailedCard.getElement().querySelector(`.film-details__close-btn`);

    const onEscPress = (evt) => {
      isEscEvent(evt, removePopup, onEscPress);
    };

    const onCloseButtonClick = () => {
      removePopup();
      document.removeEventListener(`keydown`, onEscPress);
    };

    close.addEventListener(`click`, onCloseButtonClick);
    document.addEventListener(`keydown`, onEscPress);
  };

  cover.addEventListener(`click`, renderPopup);
  title.addEventListener(`click`, renderPopup);
  comments.addEventListener(`click`, renderPopup);
};

/**
 * Рендерит карточки фильмов
 * @param  {number} count     кол-во карточек
 * @param  {element} container DOM-элемент рендеринга
 */
const renderCards = (count, container) => {
  const currentCardsList = cards.slice(0, count);
  currentCardsList.forEach((card) => {
    const newCard = new FilmCardComponent(card).getElement();
    render(container, newCard, RenderPosition.BEFOREEND);
    generateDetailedCard(card, newCard);
  });
};

/**
 * Рендерит кнопку Show more
 */
const renderShowMoreButton = () => {
  const filmsList = siteMainElement.querySelector(`.films-list`);
  render(filmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
};

/**
 * Рендерит каталог фильмов
 */
const renderFilmsCatalog = () => {
  if (!cards.length) {
    render(siteMainElement, new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
    render(siteMainElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);
    filmsCardsContainer = siteMainElement.querySelector(`.films-list__container`);
    renderCards(showingCardsCount, filmsCardsContainer);
    renderShowMoreButton();
  }
};

/**
 * Рендерит дополнительный блок с фильмами
 * @param  {element} parentContainer родительский DOM-элемент для блока
 * @param  {array} arr             массив с фильмами
 * @param  {type} title           название блока
 */
const renderExtraList = (parentContainer, arr, title) => {
  render(parentContainer, new SpecialListComponent(title).getElement(), RenderPosition.BEFOREEND);
  const container = parentContainer.querySelector(`.${title.substring(0, 3).toLowerCase()}-container`);
  const currentCardsList = arr.slice(0, CARDS_COUNT_ADDITIONAL);
  currentCardsList.forEach((card) => {
    const newCard = new FilmCardComponent(card).getElement();
    render(container, newCard, RenderPosition.BEFOREEND);
    generateDetailedCard(card, newCard);
  });
};

/**
 * Рендерит дополнительные блоки с фильмами
 */
const renderSpecialLists = () => {
  const filmsContent = siteMainElement.querySelector(`.films`);

  if (topRatedMovies[0].rating !== 0) {
    renderExtraList(filmsContent, topRatedMovies, `Top rated`);
  }

  if (mostCommentedMovies[0].comments !== 0) {
    renderExtraList(filmsContent, mostCommentedMovies, `Most commented`);
  }
};

/**
 * Показывает больше карточек фильмов
 * @callback
 */
const onShowMoreButtonClick = () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevCardsCount, showingCardsCount)
    .forEach((card) => {
      const newCard = new FilmCardComponent(card).getElement();
      render(filmsCardsContainer, newCard, RenderPosition.BEFOREEND);
      generateDetailedCard(card, newCard);
    });

  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
};

filtersCounts.watchlistCount = getFilterCount(`isAddedToWatchlist`);
filtersCounts.historyCount = getFilterCount(`isWatched`);
filtersCounts.favoritesCount = getFilterCount(`isFavorite`);

const watchedMoviesCount = getRating(filtersCounts.historyCount);

sortByRating(topRatedMovies);
sortByComments(mostCommentedMovies);
fillMoviesCount(cards.length);
renderPageHeader();
renderFilmsCatalog();
renderSpecialLists();

const showMoreButton = siteMainElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
