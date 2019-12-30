import PopupComponent from '../components/popup.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import SpecialListComponent from '../components/special-list.js';
import SortComponent from '../components/sort.js';
import SiteMenuComponent from './components/menu.js';
import RatingComponent from './components/rating.js';
import {isEscEvent, siteMainElement, sortByRating, sortByComments, getRating} from '../utils/common.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON, CARDS_COUNT_ADDITIONAL} from '../const.js';

export default class PageController {
  constructor(container) {
    this._container = container;

    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._filmsCardsContainer = null;

    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmListComponent = new FilmsListComponent();
    this._sortComponent = new SortComponent();
    this._siteMenuComponent = new SiteMenuComponent();
    this._ratingComponent = new RatingComponent();
  }

  /**
   * Рендерит хедер на страницу
   * @param  {array} arr массив карточек фильмов
   */
  _renderPageHeader(arr) {
    const watchedMoviesCount = getRating(filtersCounts.historyCount);

    const filtersCounts = {
      watchlistCount: 0,
      historyCount: 0,
      favoritesCount: 0,
    };

    /**
     * Вычисляет кол-во фильмов соответствующих фильтру
     * @param  {string} property свойство карточки фильма под фильтр
     * @return {number} кол-во фильмов соответствующих фильтру
     */
    const getFilterCount = (property) => {
      const filter = arr.filter((card) => card[property]);
      return filter.length;
    };

    filtersCounts.watchlistCount = getFilterCount(`isAddedToWatchlist`);
    filtersCounts.historyCount = getFilterCount(`isWatched`);
    filtersCounts.favoritesCount = getFilterCount(`isFavorite`);

    const siteHeaderElement = document.querySelector(`.header`);
    render(siteHeaderElement, this._ratingComponent(watchedMoviesCount), RenderPosition.BEFOREEND);
    render(siteMainElement, this._siteMenuComponent(filtersCounts), RenderPosition.BEFOREEND);
  }

  _renderCard(card, container) {
    const newCard = new FilmCardComponent(card);
    render(container, newCard, RenderPosition.BEFOREEND);
    this._generateDetailedCard(card, newCard);
  }

  /**
   * Рендерит карточки фильмов
   * @param  {number} count     кол-во карточек
   * @param  {element} container DOM-элемент рендеринга
   * @param  {array} array массив карточек фильмов
   */
  _renderCards(count, container, array) {
    const currentCardsList = array.slice(0, count);
    currentCardsList.forEach((card) => {
      this._renderCard(card, container);
    });
  }

  /**
   * Отрисовывает попап
   * @param  {object} popup объект попапа
   */
  _renderPopup(popup) {
    const body = document.querySelector(`body`);

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

    popup.bind(onCloseButtonClick);
  }

  /**
   * Генерирует попап при клике на элементы карточки
   * @param  {object} card    объект карточки фильма
   * @param  {object} newCard компонент карточки фильма
   */
  _generateDetailedCard(card, newCard) {
    const detailedCard = new PopupComponent(card);

    const onCardClick = () => {
      this._renderPopup(detailedCard);
    };

    newCard.bind(onCardClick);
  }

  /**
   * Рендерит кнопку Show more
   * @param {object} buttonComponent компонент кнопки Show More
   */
  _renderShowMoreButton(buttonComponent) {
    const filmsList = siteMainElement.querySelector(`.films-list`);
    render(filmsList, buttonComponent, RenderPosition.BEFOREEND);
  }

  /**
   * Рендерит каталог фильмов
   * @param {array} array массив карточек фильмов
   */
  _renderFilmsCatalog(array) {
    if (!array.length) {
      render(siteMainElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
    } else {
      render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
      render(siteMainElement, this._filmListComponent, RenderPosition.BEFOREEND);
      this._filmsCardsContainer = siteMainElement.querySelector(`.films-list__container`);
      this._renderCards(this._showingCardsCount, this._filmsCardsContainer, array);
      this._renderShowMoreButton(this._showMoreButtonComponent);
    }
  }

  /**
   * Рендерит дополнительный блок с фильмами
   * @param  {element} parentContainer родительский DOM-элемент для блока
   * @param  {array} arr             массив с фильмами
   * @param  {type} title           название блока
   */
  _renderExtraList(parentContainer, arr, title) {
    render(parentContainer, new SpecialListComponent(title), RenderPosition.BEFOREEND);
    const container = parentContainer.querySelector(`.${title.substring(0, 3).toLowerCase()}-container`);
    const currentCardsList = arr.slice(0, CARDS_COUNT_ADDITIONAL);
    currentCardsList.forEach((card) => {
      this._renderCard(card, container);
    });
  }

  /**
  * Рендерит дополнительные блоки с фильмами
  * @param {array} array массив всех карточек фильмов
  */
  _renderSpecialLists(array) {
    const filmsContent = siteMainElement.querySelector(`.films`);
    const topRatedMovies = array.slice();
    const mostCommentedMovies = array.slice();

    sortByRating(topRatedMovies);
    sortByComments(mostCommentedMovies);

    if (topRatedMovies[0].rating !== 0) {
      this._renderExtraList(filmsContent, topRatedMovies, `Top rated`);
    }

    if (mostCommentedMovies[0].comments !== 0) {
      this._renderExtraList(filmsContent, mostCommentedMovies, `Most commented`);
    }
  }

  init(cards) {
    /**
    * Показывает больше карточек фильмов
    * @callback
    */
    const onShowMoreButtonClick = () => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      cards.slice(prevCardsCount, this._showingCardsCount)
      .forEach((card) => {
        this._renderCard(card, this._filmsCardsContainer);
      });

      if (this._showingCardsCount >= cards.length) {
        remove(this._showMoreButtonComponent);
      }
    };

    this._showMoreButtonComponent.bind(onShowMoreButtonClick);

    this._renderPageHeader(cards);
    this._renderFilmsCatalog(cards);
    this._renderSpecialLists(cards);
  }
}
