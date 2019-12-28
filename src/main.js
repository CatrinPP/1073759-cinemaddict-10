import SiteMenuComponent from './components/menu.js';
import RatingComponent from './components/rating.js';
import PageController from './controllers/page.js';
import {generateCards} from './mock/card';
import {render, RenderPosition} from './utils/render.js';
import {getRating} from './utils/common.js';

const siteMainElement = document.querySelector(`.main`);
const cards = generateCards();
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
 * Рендерит хедер на страницу
 */
const renderPageHeader = () => {
  const siteHeaderElement = document.querySelector(`.header`);
  render(siteHeaderElement, new RatingComponent(watchedMoviesCount), RenderPosition.BEFOREEND);
  render(siteMainElement, new SiteMenuComponent(filtersCounts), RenderPosition.BEFOREEND);
};

filtersCounts.watchlistCount = getFilterCount(`isAddedToWatchlist`);
filtersCounts.historyCount = getFilterCount(`isWatched`);
filtersCounts.favoritesCount = getFilterCount(`isFavorite`);

const watchedMoviesCount = getRating(filtersCounts.historyCount);

const pageController = new PageController(siteMainElement);

fillMoviesCount(cards.length);
renderPageHeader();
pageController.render(cards);
