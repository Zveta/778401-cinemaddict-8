import {Component} from './component.js';
import moment from 'moment';

class Card extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._rating = data.rating;
    this._runtime = data.runtime;
    this._releaseDate = data.releaseDate;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._userRating = data.userRating;
    this._comments = data.comments;
    this._isWatched = data.isWatched;
    this._isWatchlist = data.isWatchlist;

    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onCommentsLinkClick = this._onCommentsLinkClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
  }

  _onCommentsLinkClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onAddToWatchListClick(evt) {
    evt.preventDefault();
    this._isWatchlist = !this._isWatchlist;
    const formData = new FormData(this._element.querySelector(`.film-card__controls`));
    const newData = this._processForm(formData);
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList(newData);
    }
    return this.update(newData);
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    this._isWatched = !this._isWatched;
    const formData = new FormData(this._element.querySelector(`.film-card__controls`));
    const newData = this._processForm(formData);
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched(newData);
    }
    return this.update(newData);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  _processForm(formData) {
    const entry = {
      comments: this._comments,
      isWatchlist: this._isWatchlist,
      isWatched: this._isWatched
    };

    const cardMapper = Card.createMapper(entry);

    for (const [property, value] of formData.entries()) {
      if (cardMapper[property]) {
        cardMapper[property](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      comments: (value) => (target.comments = value),
      isWatchlist: (value) => (target.isWatchlist = value),
      isWatched: (value) => (target.isWatched = value)
    };
  }

  _updateCommentsCount() {
    this._element.querySelector(`.film-card__comments`).innerHTML = this._updateComments();
  }

  _updateComments() {
    return `${this._comments.length === 1 ? `${this._comments.length} comment` : `${this._comments.length} comments`}`;
  }

  get template() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._releaseDate).year()}</span>
        <span class="film-card__duration">${moment.duration(this._runtime * 60000).hours()}h ${moment.duration(this._runtime * 60000).minutes()}m</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._updateComments()}</button>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`.trim();
  }

  update(data) {
    this._userRating = data.userRating;
    this._isWatched = data.isWatched;
    this._isWatchlist = data.isWatchlist;
    this._updateCommentsCount();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick.bind(this));
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .addEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
        .addEventListener(`click`, this._onAddToWatchListClick);
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onCommentsLinkClick);
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`)
        .removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
        .removeEventListener(`click`, this._onAddToWatchListClick);
  }
}
export {Card};
