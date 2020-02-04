import PageController from './controllers/page.js';
import {siteMainElement} from './utils/common.js';
import MoviesModel from './models/movies.js';
import API from './api.js';
import {END_POINT, AUTHORIZATION} from './const.js';

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();
const pageController = new PageController(siteMainElement, moviesModel, api);

/**
 * Выводит общее количество фильмов в сервисе
 * @param  {number} totalMovies кол-во фильмов
 */
const fillMoviesCount = (totalMovies) => {
  const total = document.querySelector(`.footer__statistics`).querySelector(`p`);
  total.textContent = `${totalMovies} movies inside`;
};

api.getCards()
  .then((cards) => {
    const getAllComments = cards.map((card) => {
      return api.getComments(card.id)
        .then((comments) => {
          card.comments = comments;
        });
    });
    Promise.all(getAllComments)
      .then(() => {
        moviesModel.setMovies(cards);
        pageController.init();
        fillMoviesCount(cards.length);
      });
  });
