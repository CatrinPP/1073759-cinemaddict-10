export default class Comment {
  constructor() {
    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }

  removeComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments.splice(index, 1);

    return true;
  }

  addComment(comment) {
    this._comments.unshift(comment);
  }
}
