import SiteMenuComponent from './components/menu.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import PopupComponent from './components/popup.js';
import RatingComponent from './components/rating.js';
import FilmCardComponent from './components/film-card.js';
import FilmsListComponent from './components/films-list.js';
import SpecialListComponent from './components/special-list.js';
import {generateCards} from './mock/card';
import {getRating, render, RenderPosition} from './utils.js';
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
  render(siteHeaderElement, new RatingComponent(watchedMoviesCount), RenderPosition.BEFOREEND);
  render(siteMainElement, new SiteMenuComponent(filtersCounts), RenderPosition.BEFOREEND);
};

/**
 * Рендерит карточки фильмов
 * @param  {number} count     кол-во карточек
 * @param  {element} container DOM-элемент рендеринга
 */
const renderCards = (count, container) => {
  const currentCardsList = cards.slice(0, count);
  currentCardsList.forEach((card) => render(container, new FilmCardComponent(card), RenderPosition.BEFOREEND));
};

/**
 * Рендерит кнопку Show more
 */
const renderShowMoreButton = () => {
  const filmsList = siteMainElement.querySelector(`.films-list`);
  render(filmsList, new ShowMoreButtonComponent(), RenderPosition.BEFOREEND);
};

/**
 * Рендерит каталог фильмов
 */
const renderFilmsCatalog = () => {
  render(siteMainElement, new FilmsListComponent(), RenderPosition.BEFOREEND);
  filmsCardsContainer = siteMainElement.querySelector(`.films-list__container`);
  renderCards(showingCardsCount, filmsCardsContainer);
  renderShowMoreButton();
};

/**
 * Рендерит дополнительный блок с фильмами
 * @param  {element} parentContainer родительский DOM-элемент для блока
 * @param  {array} arr             массив с фильмами
 * @param  {type} title           название блока
 */
const renderExtraList = (parentContainer, arr, title) => {
  render(parentContainer, new SpecialListComponent(title), RenderPosition.BEFOREEND);
  const container = parentContainer.querySelector(`.${title.substring(0, 3).toLowerCase()}-container`);
  const currentCardsList = arr.slice(0, CARDS_COUNT_ADDITIONAL);
  currentCardsList.forEach((card) => render(container, new FilmCardComponent(card), RenderPosition.BEFOREEND));
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
 * Рендерит попап - детализированное описание фильма
 */
const renderPopup = () => {
  const body = document.querySelector(`body`);
  render(body, new PopupComponent(cards[0]), RenderPosition.BEFOREEND);
  // const popup = body.querySelector(`.film-details`);
  // popup.style.display = `none`;
};

/**
 * Показывает больше карточек фильмов
 * @callback
 */
const onShowMoreButtonClick = () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevCardsCount, showingCardsCount)
    .forEach((card) => render(filmsCardsContainer, new FilmCardComponent(card), RenderPosition.BEFOREEND));

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
renderPopup();

const showMoreButton = siteMainElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
