export default class Comment {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.text = data[`comment`];
    this.emoji = data[`emotion`];
    this.date = data[`date`];
  }

  toRaw() {
    return {
      'id': this.id,
      'author': this.author,
      'text': this.text,
      'emoji': this.emoji,
      'date': this.date,
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
