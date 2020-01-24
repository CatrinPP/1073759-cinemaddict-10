import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';
import CommentController from './comment.js';
import CommentsModel from '../models/comments.js';

export default class MovieController {
  constructor(container, onDataChange, onViewChange, commentsModel) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._popup = null;
    this._card = null;
    this._comments = null;
    this._commentsModel = commentsModel;
    this._commentsControllers = [];
  }

  setDefaultView() {
    if (document.querySelector(`.film-details`)) {
      document.querySelector(`.film-details`).remove();
    }
  }

  /**
   * Рендерит одну карточку фильма
   * @param  {object} card     объект карточки фильма
   */
  render(card) {
    const oldCard = this._card;
    const oldPopup = this._popup;

    this._popup = new PopupComponent(card);
    this._card = new FilmCardComponent(card);
    this._comments = this._card._card.comments;
    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(this._comments);

    const onCardClick = () => {
      renderPopup();
    };

    const onFavoritesButtonClick = (evt) => {
      evt.preventDefault();
      card.isFavorite = !card.isFavorite;
      this._onDataChange(this, card);
    };

    const onWatchlistButtonClick = (evt) => {
      evt.preventDefault();
      card.isAddedToWatchlist = !card.isAddedToWatchlist;
      this._onDataChange(this, card);
    };

    const onWatchedButtonClick = (evt) => {
      evt.preventDefault();
      card.isWatched = !card.isWatched;
      this._onDataChange(this, card);
    };

    this._card.bind(onCardClick, onFavoritesButtonClick, onWatchedButtonClick, onWatchlistButtonClick);

    if (oldCard && oldPopup) {
      replace(this._card, oldCard);
    } else {
      render(this._container, this._card, RenderPosition.BEFOREEND);
    }

    const renderComments = (container, array) => {
      array.forEach((comment) => {
        const commentController = new CommentController(container, this._onCommentsDataChange);
        commentController.render(comment);
      });
    };

    /**
     * Отрисовывает попап
     */
    const renderPopup = () => {
      const body = document.querySelector(`body`);
      const allComments = this._commentsModel.getComments();

      const onEscPress = (evt) => {
        if (isEscEvent(evt)) {
          document.removeEventListener(`keydown`, onEscPress);
          remove(this._popup);
          this._onDataChange(this, card);
        }
      };

      const onCloseButtonClick = () => {
        document.removeEventListener(`keydown`, onEscPress);
        remove(this._popup);
        this._onDataChange(this, card);
      };

      this._onViewChange(this);
      render(body, this._popup, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscPress);
      const commentsList = document.querySelector(`.film-details__comments-list`);
      renderComments(commentsList, allComments);
      this._popup.bind(onCloseButtonClick);
    };
  }
}
