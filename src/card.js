import {Component} from './component.js';
import moment from 'moment';

class Card extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._rating = data.rating;
    this._year = data.year;
    this._time = data.time;
    this._genre = data.genre;
    this._picture = data.picture;
    this._description = data.description;
    this._userRating = data._userRating;
    this._comments = data.comments;
  }

  _onCommentsLinkClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _updateCommentsCount() {
    this._element.querySelector(`.film-card__comments`).innerHTML = this._comments.length === 1 ? this._comments.length + `comment` : this._comments.length + `comments`;
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._year).format(`YYYY`)}</span>
        <span class="film-card__duration">${moment(this._time).hours()}h&nbsp;${moment(this._time).minutes()}m</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="./images/posters/${this._picture}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments.length === 1 ? `${this._comments.length} comment` : `${this._comments.length} comments`}</button>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`.trim();
  }

  update(data) {
    // this.unbind();
    this._partialUpdate();
    // this.bind();

    this._userRating = data.userRating;
    this._comments = data.comments;
    this._updateCommentsCount();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onCommentsLinkClick);
  }
}

export {Card};
