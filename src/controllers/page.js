import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsListComponent from '../components/films-list.js';
import NoFilmsComponent from '../components/no-films.js';
import SpecialListComponent from '../components/special-list.js';
import SortComponent, {SortType} from '../components/sort.js';
import RatingComponent from '../components/rating.js';
import FilterComponent from '../components/filter.js';
import {siteMainElement, sortByRating, sortByComments, getRating, getFilterCount} from '../utils/common.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {SHOWING_CARDS_COUNT_ON_START, SHOWING_CARDS_COUNT_BY_BUTTON, CARDS_COUNT_ADDITIONAL, FilterType} from '../const.js';
import MovieController from './movie.js';

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    this._filmsCardsContainer = null;

    this._noFilmsComponent = new NoFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmListComponent = new FilmsListComponent();
    this._sortComponent = new SortComponent();
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._activeFilterType = FilterType.ALL;
    this._api = api;
  }

  /**
   * Рендерит хедер на страницу
   * @param  {array} arr массив карточек фильмов
   */
  _renderPageHeader(arr) {
    const siteHeaderElement = document.querySelector(`.header`);
    const watchedMoviesCount = getRating(getFilterCount(arr, `isWatched`));

    render(siteHeaderElement, new RatingComponent(watchedMoviesCount), RenderPosition.BEFOREEND);
  }

  /**
   * Рендерит Фильтры
   * @param  {element} container DOM-элемент рендеринга
   * @param  {object} moviesModel структура данных с фильмами
   */
  _renderFilter(container, moviesModel) {
    const filtersCounts = {
      watchlistCount: 0,
      historyCount: 0,
      favoritesCount: 0,
    };

    const allMovies = moviesModel.getMovies();

    filtersCounts.watchlistCount = getFilterCount(allMovies, `isAddedToWatchlist`);
    filtersCounts.historyCount = getFilterCount(allMovies, `isWatched`);
    filtersCounts.favoritesCount = getFilterCount(allMovies, `isFavorite`);

    this._filterComponent = new FilterComponent(filtersCounts);
    render(container, this._filterComponent, RenderPosition.BEFOREEND);
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
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange, this._api);
      movieController.render(card);
    });
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
      const movieController = new MovieController(container, this._onDataChange, this._onViewChange);
      movieController.render(card);
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

  _onDataChange(movieController, card) {
    this._api.updateCard(card.id, card)
    .then(() => {
      const isSuccess = this._moviesModel.updateMovie(card.id, card);

      if (isSuccess) {
        movieController.render(card);
      }
    });
  }

  _onViewChange(movieController) {
    movieController.setDefaultView();
  }

  init() {
    let cards = this._moviesModel.getMovies();

    /**
    * Показывает больше карточек фильмов
    * @callback
    */
    const onShowMoreButtonClick = () => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + SHOWING_CARDS_COUNT_BY_BUTTON;

      cards.slice(prevCardsCount, this._showingCardsCount)
      .forEach((card) => {
        const movieController = new MovieController(this._filmsCardsContainer, this._onDataChange, this._onViewChange);
        movieController.render(card);
      });

      if (this._showingCardsCount >= cards.length) {
        remove(this._showMoreButtonComponent);
      }
    };

    this._showMoreButtonComponent.bind(onShowMoreButtonClick);
    this._sortComponent.bind((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.DATE:
          sortedCards = cards.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
          break;
        default:
          sortedCards = cards.slice();
          break;
      }

      this._filmsCardsContainer.innerHTML = ``;
      this._renderFilmsCatalog(sortedCards);

      if (this._showingCardsCount >= sortedCards.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    this._renderPageHeader(cards);
    this._renderFilter(siteMainElement, this._moviesModel);
    this._renderFilmsCatalog(cards);
    this._renderSpecialLists(cards);

    this._filterComponent.bind((filterType) => {
      this._moviesModel.setFilter(filterType);
      cards = this._moviesModel.getMovies();
      this._activeFilterType = filterType;
      this._filmsCardsContainer.innerHTML = ``;
      this._showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
      this._showMoreButtonComponent.bind(onShowMoreButtonClick);
      this._renderFilmsCatalog(cards);
      if (this._showingCardsCount >= cards.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}
