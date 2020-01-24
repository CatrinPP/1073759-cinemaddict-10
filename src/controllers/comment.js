import {render, RenderPosition, remove} from '../utils/render.js';
import CommentComponent from '../components/comment.js';

export default class CommentController {
  constructor(container) {
    this._container = container;
    this._comment = null;
  }

  /**
   * Рендерит один комментарий
   * @param  {object} comment     объект комментария
   */
  render(comment) {
    this._comment = new CommentComponent(comment);

    const onDeleteButtonClick = (evt) => {
      evt.preventDefault();
      remove(this._comment);
    };

    this._comment.bind(onDeleteButtonClick);

    render(this._container, this._comment, RenderPosition.BEFOREEND);
  }
}
