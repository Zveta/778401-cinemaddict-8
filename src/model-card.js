class ModelCard {
  constructor(data) {
    this.id = data[`id`];
    this.title = data.film_info[`title`];
    this.alternativeTitle = data.film_info[`alternative_title`];
    this.description = data.film_info[`description`];
    this.poster = data.film_info[`poster`];
    this.rating = data.film_info[`total_rating`];
    this.runtime = data.film_info[`runtime`];
    this.director = data.film_info[`director`];
    this.writers = this._toString(data.film_info[`writers`] || []);
    this.actors = this._toString(data.film_info[`actors`] || []);
    this.releaseDate = data.film_info.release[`date`];
    this.country = data.film_info.release[`release_country`];
    this.ageRating = data.film_info[`age_rating`];
    this.genre = this._toString(data.film_info[`genre`] || []);
    this.comments = data.comments;
    this.author = data.comments[`author`];
    this.emotion = data.comments[`emotion`];
    this.comment = data.comments[`comment`];
    this.date = data.comments[`date`];
    this.isWatched = data.user_details[`already_watched`];
    this.isWatchlist = data.user_details[`watchlist`];
    this.isFavorite = data.user_details[`favorite`];
    this.personalRating = data.user_details[`personal_rating`];
    this.watchingDate = data.user_details[`watching_date`] || ``;
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'actors': this.actors,
        'witers': this.writers,
        'age_rating': this.ageRating,
        'alternative_title': this.alternativeTitle,
        'description': this.description,
        'director': this.director,
        'genre': this.genre,
        'poster': this.poster,
        'release': {
          'date': this.releaseDate,
          'release_country': this.country
        },
        'runtime': this.runtime,
        'title': this.title,
        'total_rating': this.rating
      },
      'user_details': {
        'already_watched': this.isWatched,
        'favorite': this.isFavorite,
        'personal_rating': this.personalRating,
        'watchlist': this.isWatchlist,
        'watching_date': this.watchingDate
      },
      'comments': {
        'author': this.author,
        'emotion': this.emotion,
        'comment': this.comment,
        'date': this.date,
      }
    };
  }

  static parseCard(data) {
    return new ModelCard(data);
  }

  static parseCards(data) {
    const arr = data.map((item) => {
      return ModelCard.parseCard(item);
    });
    return arr;
  }

  _toString(arr) {
    let result = arr.join(`, `);
    return result;
  }
}

export {ModelCard};
