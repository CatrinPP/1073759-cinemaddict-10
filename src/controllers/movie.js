import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {getRandomBoolean} from '../utils/common.js';
import {isEscEvent} from '../utils/common.js';
import CommentController from './comment.js';
import CommentsModel from '../models/comments.js';
import CardModel from '../models/card.js';
import he from 'he';

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._popup = null;
    this._card = null;
    this._comments = null;
    this._commentsModel = null;
  }

  setDefaultView() {
    if (document.querySelector(`.film-details`)) {
      document.querySelector(`.film-details`).remove();
    }
  }

  _deleteComment(commentsModel, id) {
    commentsModel.removeComment(id);
    const count = document.querySelector(`.film-details__comments-count`);
    count.textContent = `${commentsModel.getComments().length}`;
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
      const newCard = CardModel.clone(card);
      newCard.isFavorite = !newCard.isFavorite;
      this._onDataChange(this, newCard);
    };

    const onWatchlistButtonClick = (evt) => {
      evt.preventDefault();
      const newCard = CardModel.clone(card);
      newCard.isAddedToWatchlist = !newCard.isAddedToWatchlist;
      this._onDataChange(this, newCard);
    };

    const onWatchedButtonClick = (evt) => {
      evt.preventDefault();
      const newCard = CardModel.clone(card);
      newCard.isWatched = !newCard.isWatched;
      this._onDataChange(this, newCard);
    };

    this._card.bind(onCardClick, onFavoritesButtonClick, onWatchedButtonClick, onWatchlistButtonClick);
    const allComments = this._commentsModel.getComments();
    if (oldCard && oldPopup) {
      replace(this._card, oldCard);
      const cardCommentsCount = document.querySelector(`.film-card__comments`);
      cardCommentsCount.textContent = `${allComments.length} comments`;
    } else {
      render(this._container, this._card, RenderPosition.BEFOREEND);
    }

    const renderComments = (container, array) => {
      array.forEach((comment) => {
        const commentController = new CommentController(container, this._commentsModel, this._deleteComment);
        commentController.render(comment);
      });
    };

    /**
     * Отрисовывает попап
     */
    const renderPopup = () => {
      const body = document.querySelector(`body`);

      const onEscPress = (evt) => {
        if (isEscEvent(evt)) {
          const newCard = CardModel.clone(card);
          document.removeEventListener(`keydown`, onEscPress);
          remove(this._popup);
          this._onDataChange(this, newCard);
        }
      };

      /**
       * Перерисовывает комментарии
       * @param  {Array} newData Массив с комментариями
       */
      const updateComments = (newData) => {
        const parent = document.querySelector(`.film-details__comments-list`);
        parent.innerHTML = ``;
        renderComments(parent, newData);
      };

      const onCloseButtonClick = () => {
        const newCard = CardModel.clone(card);
        document.removeEventListener(`keydown`, onEscPress);
        remove(this._popup);
        this._onDataChange(this, newCard);
      };

      /**
       * Обработчик события отправки комментария (по Ctrl+Enter)
       */
      const onNewCommentSubmit = () => {
        const checkedEmoji = document.querySelector(`.film-details__emoji-item:checked`).value;
        const newComment = {
          id: String(new Date() + Math.random()),
          author: getRandomBoolean() ? `Tim Macoveev` : `John Doe`,
          text: he.encode(event.target.value),
          emoji: checkedEmoji,
          date: new Date(),
        };

        this._commentsModel.addComment(newComment);
        updateComments(this._commentsModel.getComments());
        event.target.value = null;
        const count = document.querySelector(`.film-details__comments-count`);
        count.textContent = `${this._commentsModel.getComments().length}`;
      };

      this._onViewChange(this);
      render(body, this._popup, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscPress);
      const commentsList = document.querySelector(`.film-details__comments-list`);
      renderComments(commentsList, allComments);
      this._popup.bind(onCloseButtonClick, onNewCommentSubmit);
      const count = document.querySelector(`.film-details__comments-count`);
      count.textContent = `${allComments.length}`;
    };
  }
}
