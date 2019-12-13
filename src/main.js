import {createSiteMenuTemplate} from './components/menu.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmDetailsTemplate} from './components/popup.js';
import {getRating, createRatingTemplate} from './components/rating.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmsListTemplate, createSpecialListTemplate} from './components/films-lists.js';
import {generateCards} from './mock/card';
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
  favouritesCount: 0,
};

/**
 * Выводит общее количество фильмов в сервисе
 * @param  {number} totalMovies {кол-во фильмов}
 */
const fillMoviesCount = (totalMovies) => {
  const total = document.querySelector(`.footer__statistics`).querySelector(`p`);
  total.textContent = `${totalMovies} movies inside`;
};

/**
 * Вычисляет кол-во фильмов соответствующих фильтру
 * @param  {string} property {свойство карточки фильма под фильтр}
 * @return {number} {кол-во фильмов соответствующих фильтру}
 */
const getFilterCount = (property) => {
  const filter = cards.filter((card) => card[property]);
  return filter.length;
};

/**
 * Сортирует массив фильмов по уменьшению рейтинга
 * @param  {array} arr {массив фильмов}
 */
const sortByRating = (arr) => {
  arr.sort((a, b) => b.rating - a.rating);
};

/**
 * Сортирует массив фильмов по уменьшению кол-ва комментариев
 * @param  {array} arr {массив фильмов}
 */
const sortByComments = (arr) => {
  arr.sort((a, b) => b.comments - a.comments);
};

/**
 * Рендерит шаблон верстки в контейнер
 * @param  {element} container {DOM-элемент рендеринга}
 * @param  {string} template  {шаблон верстки}
 * @param  {string} place     {местоположение в контейнере}
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

/**
 * Рендерит хедер на страницу
 */
const renderPageHeader = () => {
  const siteHeaderElement = document.querySelector(`.header`);
  render(siteHeaderElement, createRatingTemplate(watchedMoviesCount));
  render(siteMainElement, createSiteMenuTemplate(filtersCounts));
};

/**
 * Рендерит карточки фильмов
 * @param  {number} count     {коли-во карточек}
 * @param  {element} container {DOM-элемент рендеринга}
 */
const renderCards = (count, container) => {
  const currentCardsList = cards.slice(0, count);
  currentCardsList.forEach((card) => render(container, createFilmCardTemplate(card)));
};

/**
 * Рендерит кнопку Show more
 */
const renderShowMoreButton = () => {
  const filmsList = siteMainElement.querySelector(`.films-list`);
  render(filmsList, createShowMoreButtonTemplate());
};

/**
 * Рендерит каталог фильмов
 */
const renderFilmsCatalog = () => {
  render(siteMainElement, createFilmsListTemplate());
  filmsCardsContainer = siteMainElement.querySelector(`.films-list__container`);
  renderCards(showingCardsCount, filmsCardsContainer);
  renderShowMoreButton();
};

/**
 * Рендерит дополнительный блок с фильмами
 * @param  {element} parentContainer {родительский DOM-элемент для блока}
 * @param  {array} arr             {массив с фильмами}
 * @param  {type} title           {название блока}
 */
const renderExtraList = (parentContainer, arr, title) => {
  render(parentContainer, createSpecialListTemplate(title));
  const container = parentContainer.querySelector(`.${title.substring(0, 3).toLowerCase()}-container`);
  const currentCardsList = arr.slice(0, CARDS_COUNT_ADDITIONAL);
  currentCardsList.forEach((card) => render(container, createFilmCardTemplate(card)));
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
  render(body, createFilmDetailsTemplate(cards[0]));
  const popup = body.querySelector(`.film-details`);
  popup.style.display = `none`;
};

/**
 * @callback {Показывает больше карточек фильмов}
 */
const onShowMoreButtonClick = () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

  cards.slice(prevCardsCount, showingCardsCount)
    .forEach((card) => render(filmsCardsContainer, createFilmCardTemplate(card)));

  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
};

filtersCounts.watchlistCount = getFilterCount(`isAddedToWatchlist`);
filtersCounts.historyCount = getFilterCount(`isWatched`);
filtersCounts.favouritesCount = getFilterCount(`isFavourite`);

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
