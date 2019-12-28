import PopupComponent from '../components/popup.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import SpecialListComponent from '../components/special-list.js';
import SortComponent from '../components/sort.js';
import {isEscEvent} from '../utils/common.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON, CARDS_COUNT_ADDITIONAL} from '../const.js';

const body = document.querySelector(`body`);
const siteMainElement = document.querySelector(`.main`);
let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
let filmsCardsContainer = null;
const showMoreButton = new ShowMoreButtonComponent();

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

const renderCard = (card, container) => {
  const newCard = new FilmCardComponent(card);
  render(container, newCard, RenderPosition.BEFOREEND);
  generateDetailedCard(card, newCard);
};

/**
 * Рендерит карточки фильмов
 * @param  {number} count     кол-во карточек
 * @param  {element} container DOM-элемент рендеринга
 * @param  {array} array массив карточек фильмов
 */
const renderCards = (count, container, array) => {
  const currentCardsList = array.slice(0, count);
  currentCardsList.forEach((card) => {
    renderCard(card, container);
  });
};

/**
 * Отрисовывает попап
 * @param  {object} popup объект попапа
 */
const renderPopup = (popup) => {
  const onEscPress = (evt) => {
    if (isEscEvent(evt)) {
      remove(popup);
      document.removeEventListener(`keydown`, onEscPress);
    }
  };

  const onCloseButtonClick = () => {
    remove(popup);
    document.removeEventListener(`keydown`, onEscPress);
  };

  if (body.querySelector(`.film-details`)) {
    body.querySelector(`.film-details`).remove();
  }

  render(body, popup, RenderPosition.BEFOREEND);
  document.addEventListener(`keydown`, onEscPress);

  popup.setCloseButtonHandler(onCloseButtonClick);
};

/**
 * Генерирует попап при клике на элементы карточки
 * @param  {object} card    объект карточки фильма
 * @param  {object} newCard компонент карточки фильма
 */
const generateDetailedCard = (card, newCard) => {
  const detailedCard = new PopupComponent(card);

  const onCardClick = () => {
    renderPopup(detailedCard);
  };

  newCard.setCardDetailsClickHandler(onCardClick);
};

/**
 * Рендерит кнопку Show more
 * @param {object} buttonComponent компонент кнопки Show More
 */
const renderShowMoreButton = (buttonComponent) => {
  const filmsList = siteMainElement.querySelector(`.films-list`);
  render(filmsList, buttonComponent, RenderPosition.BEFOREEND);
};

/**
 * Рендерит каталог фильмов
 * @param {array} array массив карточек фильмов
 */
const renderFilmsCatalog = (array) => {
  if (!array.length) {
    render(siteMainElement, new NoFilmsComponent(), RenderPosition.BEFOREEND);
  } else {
    render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);
    render(siteMainElement, new FilmsListComponent(), RenderPosition.BEFOREEND);
    filmsCardsContainer = siteMainElement.querySelector(`.films-list__container`);
    renderCards(showingCardsCount, filmsCardsContainer, array);
    renderShowMoreButton(showMoreButton);
  }
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
  currentCardsList.forEach((card) => {
    renderCard(card, container);
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(cards) {
    const topRatedMovies = cards.slice();
    const mostCommentedMovies = cards.slice();

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
        renderCard(card, filmsCardsContainer);
      });

      if (showingCardsCount >= cards.length) {
        remove(showMoreButton);
      }
    };

    showMoreButton.setClickHandler(onShowMoreButtonClick);

    sortByRating(topRatedMovies);
    sortByComments(mostCommentedMovies);
    renderFilmsCatalog(cards);
    renderSpecialLists();
  }
}
