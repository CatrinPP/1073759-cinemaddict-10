import PageController from './controllers/page.js';
import {generateCards} from './mock/card';
import {siteMainElement} from './utils/common.js';
import MoviesModel from './models/movies.js';

const cards = generateCards();
const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);

/**
 * Выводит общее количество фильмов в сервисе
 * @param  {number} totalMovies кол-во фильмов
 */
const fillMoviesCount = (totalMovies) => {
  const total = document.querySelector(`.footer__statistics`).querySelector(`p`);
  total.textContent = `${totalMovies} movies inside`;
};

const pageController = new PageController(siteMainElement);

fillMoviesCount(cards.length);
pageController.init(cards);
