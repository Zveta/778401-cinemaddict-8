import {Component} from './component.js';
import moment from 'moment';

class Popup extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._alternativeTitle = data.alternativeTitle;
    this._rating = data.rating;
    this._director = data.director;
    this._writers = data.writers;
    this._actors = data.actors;
    this._releaseDate = data.releaseDate;
    this._runtime = data.runtime;
    this._country = data.country;
    this._genre = data.genre;
    this._poster = data.poster;
    this._description = data.description;
    this._comments = data.comments;
    this._ageRating = data.ageRating;
    this._userRating = data.userRating;

    this._onPopupClose = null;
    this._onPopupEsc = null;
    this._onAddComment = null;
    this._onCommentUndo = null;
    this._onAddRating = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onMarkAsFavorite = null;

    this._onCloseClick = this._onCloseClick.bind(this);
    this._onEscKeydown = this._onEscKeydown.bind(this);
    this._onCommentKeydown = this._onCommentKeydown.bind(this);
    this._onCommentUndoClick = this._onCommentUndoClick.bind(this);
    this._onRatingClick = this._onRatingClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);
  }

  set onPopupClose(fn) {
    this._onPopupClose = fn;
  }

  set onPopupEsc(fn) {
    this._onPopupEsc = fn;
  }

  set onAddComment(fn) {
    this._onAddComment = fn;
  }

  set onCommentUndo(fn) {
    this._onCommentUndo = fn;
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

  _onCloseClick() {
    const formData = new FormData(this._element.querySelector(`.film-details__inner`));
    const newData = this._processForm(formData);
    if (typeof this._onPopupClose === `function`) {
      this._onPopupClose();
    }
    return this.update(newData);
  }

  _onEscKeydown(evt) {
    if (evt.keyCode === 27 && typeof this._onPopupEsc === `function`) {
      this._onPopupEsc();
    }
  }

  _onCommentKeydown(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === 13) {
      evt.preventDefault();
      const newComment = {};
      const message = this._element.querySelector(`.film-details__comment-input`);
      newComment.emotion = this._getEmotion(this._element.querySelector(`.film-details__emoji-item:checked + label`).textContent);
      newComment.comment = message.value;
      newComment.author = `me`;
      newComment.date = moment().format(`DD MMMM YYYY`);

      this._comments.push(newComment);
      this._element.querySelector(`.film-details__user-rating-controls`).classList.remove(`visually-hidden`);
      this._element.querySelector(`.film-details__watched-status`).innerHTML = `Comment added`;
      if (typeof this._onAddComment === `function`) {
        this._onAddComment(this._comments);
      }
    }
  }

  updateComments() {
    this._element.querySelector(`.film-details__comments-list`).innerHTML = this._getComments();
    this._element.querySelector(`.film-details__comments-count`).textContent = this._comments.length;
  }

  _onCommentUndoClick() {
    this._comments.pop();

    this.unbind();
    this._partialUpdate();
    this.bind();
    this._element.querySelector(`.film-details__user-rating-controls`).classList.remove(`visually-hidden`);
    this._element.querySelector(`.film-details__watched-status`).innerHTML = `Comment deleted`;
    this._element.querySelector(`.film-details__watched-reset`).classList.add(`visually-hidden`);
    if (typeof this._onCommentUndo === `function`) {
      this._onCommentUndo();
    }
  }

  _onRatingClick(evt) {
    if (evt.target.classList.contains(`film-details__user-rating-label`)) {
      this._userRating = evt.target.innerText;
      this.unbind();
      this._partialUpdate();
      this.bind();
    }
    if (typeof this._onAddRating === `function`) {
      this._onAddRating();
    }
  }

  _processForm(formData) {
    const entry = {
      comments: this._comments,
      userRating: this._userRating,
      isWatchlist: this._isWatchlist,
      isWatched: this._isWatched,
      isFavorite: this._isFavorite
    };

    const popupMapper = Popup.createMapper(entry);

    for (const [property, value] of formData.entries()) {
      if (popupMapper[property]) {
        popupMapper[property](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      rating: (value) => (target.userRating = value),
      comments: (value) => (target.comments = value)
    };
  }

  _getEmotion(emotion) {
    switch (emotion) {
      case `😀`:
        return `grinning`;

      case `😐`:
        return `neutral-face`;

      case `😴`:
        return `sleeping`;

      default:
        return ``;
    }
  }

  _getComments() {
    let commentsHTML = ``;
    const emotions = {
      'sleeping': `😴`,
      'neutral-face': `😐`,
      'grinning': `😀`
    };
    this._comments.forEach(function (comment) {
      const commentTemplate = `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">${emotions[comment.emotion]}</span>
        <div>
          <p class="film-details__comment-text">${comment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${moment(comment.date).toNow(true)} ago</span>
          </p>
        </div>
      </li>
      `;
      commentsHTML += commentTemplate;
    });
    return commentsHTML;
  }

  // _onCommentUndoClick() {
  //   if (typeof this._onCommentUndo === `function`) {
  //     this._onCommentUndo();
  //   }
  // }

  _getRatingButtons(number) {
    let ratingHTML = ``;
    for (let i = 0; i < 10; i++) {
      const ratingTemplate = `
        <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${ i === +number ? `checked` : ``}>
        <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>`;
      ratingHTML += ratingTemplate;
    }
    return ratingHTML;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  blockComments() {
    this._element.querySelector(`.film-details__add-emoji`).disabled = true;
    this._element.querySelector(`.film-details__comment-input`).disabled = true;
  }

  unblockComments() {
    this._element.querySelector(`.film-details__add-emoji`).disabled = false;
    this._element.querySelector(`.film-details__comment-input`).disabled = false;
    this._element.querySelector(`.film-details__comment-input`).value = ``;
  }

  _getStatus() {
    return `${this._isWatched ? `Already watched` : `Will watch`}`;
  }

  _updateStatus() {
    this._element.querySelector(`.film-details__watched-status`).innerHTML = this.userRating_getStatus();
  }

  get template() {
    return `
    <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${this._poster}" alt="${this._title}">

          <p class="film-details__age">${this._ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">${this._alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
              <p class="film-details__user-rating">${this._userRating ? `Your rate ${this._userRating}` : ``}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${moment(this.releaseDate).format(`DD MMMM YYYY`)} (${this._country})</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._runtime}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${this._genre}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${this._description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" checked>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>

      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${this._getComments()}
        </ul>

        <div class="film-details__new-comment">
          <div>
            <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
            <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
              <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
              <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
            </div>
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
          </label>
        </div>
      </section>

      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls visually-hidden">
          <span class="film-details__watched-status film-details__watched-status--active"></span>
          <button class="film-details__watched-reset" type="button">undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${this._poster}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${this._title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              ${this._getRatingButtons(this._userRating)}
            </div>
          </section>
        </div>
      </section>
    </form>
  </section>
  `.trim();
  }

  _onAddToWatchListClick(evt) {
    evt.preventDefault();
    this._isWatchlist = !this._isWatchlist;
    const formData = new FormData(this._element.querySelector(`#watchlist`));
    const newData = this._processForm(formData);
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList(newData);
    }
    return this.update(newData);
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();
    this._isWatched = !this._isWatched;
    const formData = new FormData(this._element.querySelector(`#watched`));
    const newData = this._processForm(formData);
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched(newData);
    }
    return this.update(newData);
  }

  _onMarkAsFavoriteClick(evt) {
    evt.preventDefault();
    this._isFavorite = !this._isFavorite;
    const formData = new FormData(this._element.querySelector(`#favorite`));
    const newData = this._processForm(formData);
    if (typeof this._onMarkAsFavorite === `function`) {
      this._onMarkAsFavorite(newData);
    }
    return this.update(newData);
  }

  bind() {
    document.addEventListener(`keydown`, this._onEscKeydown);
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCloseClick);
    this._element.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._onCommentKeydown);
    this._element.querySelectorAll(`.film-details__user-rating-label`).forEach((item) => {
      item.addEventListener(`click`, this._onRatingClick);
    });
    this._element.querySelector(`#watched`)
    .addEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`#watchlist`)
    .addEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`#favorite`)
    .addEventListener(`click`, this.onMarkAsFavoriteClick);
    this._element.querySelector(`.film-details__watched-reset`)
    .addEventListener(`click`, this._onCommentUndoClick);
  }

  unbind() {
    document.removeEventListener(`keydown`, this._onEscKeydown);
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onCloseClick);
    this._element.querySelector(`.film-details__comment-input`).removeEventListener(`keydown`, this._onCommentKeydown);
    this._element.querySelectorAll(`.film-details__user-rating-label`).forEach((item) => {
      item.removeEventListener(`click`, this._onRatingClick);
    });
    this._element.querySelector(`#watched`)
    .removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._element.querySelector(`#watchlist`)
    .removeEventListener(`click`, this._onAddToWatchListClick);
    this._element.querySelector(`#favorite`)
    .removeEventListener(`click`, this._onMarkAsFavoriteClick);
    this._element.querySelector(`.film-details__watched-reset`)
    .removeEventListener(`click`, this._onCommentUndoClick);
  }

  update(data) {
    this._userRating = data.userRating;
    this._comments = data.comments;
    this._isWatched = data.isWatched;
    this._isWatchlist = data.isWatchlist;
    this._isFavorite = data.isFavorite;
    this._comments.emotion = data.comments.emotion;
    this._comments.comment = data.comments.comment;
    this._comments.author = data.comments.author;
    this._comments.date = data.comments.date;
    this.updateComments();
  }

  shakeComment() {
    this._element.querySelector(`.film-details__comments-wrap`).classList.add(`shake`);
  }

  shake() {
    const ANIMATION_TIMEOUT = 300;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }
}

export {Popup};
