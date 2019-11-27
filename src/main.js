import {createSiteMenuTemplate} from './components/menu.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmDetailsTemplate} from './components/popup.js';
import {createRatingTemplate} from './components/rating.js';
import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmsListTemplate} from './components/films-lists.js';
import {createMostCommentedListTemplate} from './components/films-lists.js';
import {createTopRatedListTemplate} from './components/films-lists.js';

const CARDS_COUNT = 5;
const CARDS_COUNT_ADDITIONAL = 2;

const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const getPageHeader = () => {
  const siteHeaderElement = document.querySelector(`.header`);
  render(siteHeaderElement, createRatingTemplate());
  render(siteMainElement, createSiteMenuTemplate());
};

const getCards = (count, container) => {
  new Array(count)
    .fill(``)
    .forEach(
        () => render(container, createFilmCardTemplate())
    );
};

const getShowMoreButton = () => {
  const filmsList = siteMainElement.querySelector(`.films-list`);
  render(filmsList, createShowMoreButtonTemplate());
};

const getFilmsCatalog = () => {
  render(siteMainElement, createFilmsListTemplate());
  const filmsCardsContainer = siteMainElement.querySelector(`.films-list__container`);
  getCards(CARDS_COUNT, filmsCardsContainer);
  getShowMoreButton();
};

const getSpecialLists = () => {
  const filmsContent = siteMainElement.querySelector(`.films`);
  render(filmsContent, createTopRatedListTemplate());
  render(filmsContent, createMostCommentedListTemplate());
  const extraFilmsLists = filmsContent.querySelectorAll(`.films-list--extra`);
  extraFilmsLists.forEach((item) => getCards(CARDS_COUNT_ADDITIONAL, item.querySelector(`.films-list__container`)));
};

const getPopup = () => {
  const body = document.querySelector(`body`);
  render(body, createFilmDetailsTemplate());
  const popup = body.querySelector(`.film-details`);
  popup.style.display = `none`;
};

getPageHeader();
getFilmsCatalog();
getSpecialLists();
getPopup();
