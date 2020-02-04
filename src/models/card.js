import moment from 'moment';

export default class Card {
  constructor(data) {
    const filmInfo = data.film_info;
    const userDetails = data.user_details;
    this.id = data.id;
    this.title = filmInfo.title;
    this.rating = filmInfo.total_rating;
    this.year = moment(filmInfo.release.date).format(`YYYY`);
    this.duration = filmInfo.runtime;
    this.genres = filmInfo.genre;
    this.poster = filmInfo.poster;
    this.description = filmInfo.description;
    this.comments = data.comments;
    this.isAddedToWatchlist = userDetails.watchlist;
    this.isWatched = userDetails.already_watched;
    this.isFavorite = userDetails.favorite;
    this.originalTitle = filmInfo.alternative_title;
    this.director = filmInfo.director;
    this.writers = filmInfo.writers;
    this.actors = filmInfo.actors;
    this.releaseDate = filmInfo.release.date;
    this.country = filmInfo.release.release_country;
    this.age = filmInfo.age_rating;
    this.watchingDate = userDetails.watching_date;
    this.userRating = userDetails.personal_rating;
  }

  toRaw() {
    return {
      'id': this.id,
      'comments': this.comments.map((comment) => {
        return comment.id ? comment.id : comment;
      }),
      'film_info': {
        'title': this.title,
        'alternative_title': this.originalTitle,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.age,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.releaseDate,
          'release_country': this.country
        },
        'runtime': this.duration,
        'genre': this.genres,
        'description': this.description
      },
      'user_details': {
        'personal_rating': this.userRating,
        'watchlist': this.isAddedToWatchlist,
        'already_watched': this.isWatched,
        'watching_date': this.watchingDate ? new Date(this.watchingDate).toISOString() : new Date(0).toISOString(),
        'favorite': this.isFavorite
      }
    };
  }

  static parseCard(data) {
    return new Card(data);
  }

  static parseCards(data) {
    return data.map(Card.parseCard);
  }

  static clone(data) {
    return new Card(data.toRaw());
  }
}
