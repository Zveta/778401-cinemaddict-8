import Component from './component.js';
import moment from 'moment';
const MAX_LENGTH = 140;

export default class Card extends Component {
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
    this._isFavorite = data.isFavorite;
    this._watchingDate = data.watchingDate;

    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onMarkAsFavorite = null;

    this._onCommentsLinkClick = this._onCommentsLinkClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);
  }

  _onCommentsLinkClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onAddToWatchListClick(evt) {
    evt.preventDefault();
    this._isWatchlist = !this._isWatchlist;
    const formData = new FormData(this._controls);
    const newData = this._processForm(formData);
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList(newData);
    }
    return this.update(newData);
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    this._isWatched = !this._isWatched;
    const formData = new FormData(this._controls);
    const newData = this._processForm(formData);
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched(newData);
    }
    return this.update(newData);
  }

  _onMarkAsFavoriteClick(evt) {
    evt.preventDefault();
    this._isFavorite = !this._isFavorite;
    const formData = new FormData(this._controls);
    const newData = this._processForm(formData);
    if (typeof this._onMarkAsFavorite === `function`) {
      this._onMarkAsFavorite(newData);
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

  set onMarkAsFavorite(fn) {
    this._onMarkAsFavorite = fn;
  }

  _processForm(formData) {
    const entry = {
      comments: this._comments,
      isWatchlist: this._isWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite
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
      isWatched: (value) => (target.isWatched = value),
      isFavorite: (value) => (target.isFavorite = value)
    };
  }

  _updateCommentsCount() {
    this._commentsLink.innerHTML = this._updateComments();
  }

  _updateComments() {
    return `${this._comments.length === 1 ? `${this._comments.length} comment` : `${this._comments.length} comments`}`;
  }

  _getDesc() {
    return `${this._description.length <= MAX_LENGTH ? this._description : `${this._description.slice(0, MAX_LENGTH)}...`}`;
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
      <p class="film-card__description">${this._getDesc()}</p>
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
    this._isFavorite = data.isFavorite;
    this._updateCommentsCount();
  }

  bind() {
    this._controls = this._element.querySelector(`.film-card__controls`);
    this._commentsLink = this._element.querySelector(`.film-card__comments`);
    this._watchedBtn = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
    this._watchlistBtn = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    this._favoriteBtn = this._element.querySelector(`.film-card__controls-item--favorite`);

    this._commentsLink.addEventListener(`click`, this._onCommentsLinkClick.bind(this));
    this._watchedBtn.addEventListener(`click`, this._onMarkAsWatchedClick);
    this._watchlistBtn.addEventListener(`click`, this._onAddToWatchListClick);
    this._favoriteBtn.addEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  unbind() {
    this._commentsLink.removeEventListener(`click`, this._onCommentsLinkClick);
    this._watchedBtn.removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._watchlistBtn.removeEventListener(`click`, this._onAddToWatchListClick);
    this._favoriteBtn.removeEventListener(`click`, this._onMarkAsFavoriteClick);
  }
}
