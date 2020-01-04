import FilmCardComponent from '../components/film-card.js';
import PopupComponent from '../components/popup.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {isEscEvent} from '../utils/common.js';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._popup = null;
    this._card = null;
  }

  /**
   * Рендерит одну карточку фильма
   * @param  {object} card     объект карточки фильма
   */
  render(card) {
    const oldCard = this._card;
    this._popup = new PopupComponent(card);
    this._card = new FilmCardComponent(card);

    const onCardClick = () => {
      this._renderPopup(this._popup);
    };

    this._card.bind(onCardClick);
    this._card.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite
      }));
    });
    this._card.setWatchListdButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isAddedToWatchlist: !card.isAddedToWatchlist
      }));
    });
    this._card.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched
      }));
    });

    if (oldCard) {
      replace(this._card, oldCard);
    } else {
      render(this._container, this._card, RenderPosition.BEFOREEND);
    }
  }

  /**
   * Отрисовывает попап
   */
  _renderPopup() {
    const body = document.querySelector(`body`);

    const onEscPress = (evt) => {
      if (isEscEvent(evt)) {
        remove(this._popup);
        document.removeEventListener(`keydown`, onEscPress);
      }
    };

    const onCloseButtonClick = () => {
      remove(this._popup);
      document.removeEventListener(`keydown`, onEscPress);
    };

    if (body.querySelector(`.film-details`)) {
      body.querySelector(`.film-details`).remove();
    }

    render(body, this._popup, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscPress);

    this._popup.bind(onCloseButtonClick);
  }
}
