import moment from 'moment';

export default class Card {
  constructor(data) {
    this.id = data[`id`];
    this.title = data.film_info[`title`];
    this.rating = data.film_info[`total_rating`];
    this.year = moment(data.film_info.release[`date`]).format(`YYYY`);
    this.duration = data.film_info[`runtime`];
    this.genres = data.film_info[`genre`];
    this.poster = data.film_info[`poster`];
    this.description = data.film_info[`description`];
    this.comments = data[`comments`];
    this.isAddedToWatchlist = data.user_details[`watchlist`];
    this.isWatched = data.user_details[`already_watched`];
    this.isFavorite = data.user_details[`favorite`];
    this.originalTitle = data.film_info[`alternative_title`];
    this.director = data.film_info[`director`];
    this.writers = data.film_info[`writers`];
    this.actors = data.film_info[`actors`];
    this.releaseDate = data.film_info.release[`date`];
    this.country = data.film_info.release[`release_country`];
    this.age = data.film_info[`age_rating`];
  }

  toRaw() {
    return {
      'id': this.id,
      'title': this.title,
      'rating': this.rating,
      'year': this.year,
      'duration': this.duration,
      'genres': this.genres,
      'poster': this.poster,
      'description': this.description,
      'comments': this.comments,
      'isAddedToWatchlist': this.isAddedToWatchlist,
      'isWatched': this.isWatched,
      'isFavorite': this.isFavorite,
      'originalTitle': this.originalTitle,
      'director': this.director,
      'writers': this.writers,
      'actors': this.actors,
      'releaseDate': this.releaseDate,
      'country': this.country,
      'age': this.age,
    };
  }

  static parseCard(data) {
    return new Card(data);
  }

  static parseCards(data) {
    return data.map(Card.parseCard);
  }
}
