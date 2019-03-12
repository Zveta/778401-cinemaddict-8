/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/card.js":
/*!*********************!*\
  !*** ./src/card.js ***!
  \*********************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


class Card {
  constructor(data) {
    this._title = data.title;
    this._rating = data.rating;
    this._year = data.year;
    this._time = data.time;
    this._genre = data.genre;
    this._picture = data.picture;
    this._description = data.description;
    this._comments = data.comments;

    this._element = null;
  }

  _onCommentsLinkClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
        <span class="film-card__duration">${this._time}</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="./images/posters/${this._picture}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <button class="film-card__comments">${this._comments}</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`.trim();
  }

  bind() {
    this._element.querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsLinkClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.film-card__comments`)
      .removeEventListener(`click`, this._onCommentsLinkClick);
  }

  render() {
    this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}




/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: getMovie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMovie", function() { return getMovie; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


const movie = {
  title: [
    `Zero`,
    `One`,
    `Two`,
    `Three`,
    `Four`,
    `Five`,
    `Six`,
    `Seven`,
    `Eight`,
    `Nine`,
    `Ten`,
    `Star`,
    `Wars`,
    `Fantastic`,
    `Beasts`
  ][Math.floor(Math.random() * 15)],
  promoLine: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getPromo"])(`Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit`.split(` `)),
  description: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getDesc"])(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `)),
  picture: [`accused.jpg`, `blackmail.jpg`, `blue-blazes.jpg`, `fuga-da-new-york.jpg`, `moonrise.jpg`, `three-friends.jpg`][Math.floor(Math.random() * 6)],
  rating: (Math.random() * 10).toFixed(1),
  year: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntgr"])(1896, new Date().getFullYear()),
  time: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntgr"])(1, 3) + `h&nbsp;` + Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntgr"])(1, 60) + `m`,
  director: [
    `Emmaline Humbertson`,
    `Herb Hopp`,
    `Candis Heimer`,
    `Jamey Fonda`,
    `Mirian Grose`
  ][Math.floor(Math.random() * 5)],
  writer: [
    `Emmaline Humbertson`,
    `Herb Hopp`,
    `Candis Heimer`,
    `Jamey Fonda`,
    `Mirian Grose`
  ][Math.floor(Math.random() * 5)],
  actors: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getActors"])([
    `Elizebeth Haig`,
    `Azalee Lebrun`,
    `Ty Loken`,
    `Yolonda Flagler`,
    `Jone Dagenais`,
    `Armand Madere`,
    `Lorine Depaola`,
    `Maryanna Herndon`,
    `Otha Dimauro`,
    `Jenniffer Bayley`]),
  releaseDate: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["randomDate"])(new Date(1896, 0, 1), new Date()),
  country: [
    `Russia`,
    `USA`,
    `Italy`,
    `France`,
    `Germany`,
    `Spain`,
    `Canada`,
    `Hungary`,
    `Great Britain`,
    `Belgium`
  ][Math.floor(Math.random() * 10)],
  genre: [
    `Action`,
    `Adventure`,
    `Animation`,
    `Biography`,
    `Comedy`,
    `Crime`,
    `Documentary`,
    `Drama`,
    `Fantasy`,
    `Horror`,
    `Mystery`,
    `Romance`,
    `Sci-Fi`,
    `Thriller`][Math.floor(Math.random() * 14)],
  comments: (Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntgr"])(0, 100) === 1 ? Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntgr"])(0, 100) + ` comment` : Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntgr"])(0, 100) + ` comments`)
};

const getMovie = function () {
  return movie;
};




/***/ }),

/***/ "./src/filter-template.js":
/*!********************************!*\
  !*** ./src/filter-template.js ***!
  \********************************/
/*! exports provided: getFilterElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilterElement", function() { return getFilterElement; });
const getFilterElement = function (caption, amount, isChecked = false) {
  return `
  <a href="#${caption.toLowerCase()}" class="main-navigation__item filter ${isChecked ? `main-navigation__item--active` : ``}">
    ${caption}
    ${caption !== `All` ? `<span class="main-navigation__item-count">${amount}</span>` : ``}
  </a>
    `;
};


/***/ }),

/***/ "./src/generate-movies.js":
/*!********************************!*\
  !*** ./src/generate-movies.js ***!
  \********************************/
/*! exports provided: generateMovies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateMovies", function() { return generateMovies; });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/data.js");




const generateMovies = function (amount) {
  let movies = [];
  for (let i = 0; i < amount; i++) {
    movies.push(Object(_data_js__WEBPACK_IMPORTED_MODULE_0__["getMovie"])());
  }
  return movies;
};




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter_template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-template.js */ "./src/filter-template.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _generate_movies_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generate-movies.js */ "./src/generate-movies.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.js */ "./src/data.js");
/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./card.js */ "./src/card.js");
/* harmony import */ var _popup_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popup.js */ "./src/popup.js");







const filterTypes = [`All`, `Watchlist`, `History`, `Favorites`];
const body = document.querySelector(`body`);
const cardsNode = document.querySelector(`.films-list__container`);
const filtersNode = document.querySelector(`.main-navigation`);
const topRatedNode = document.querySelector(`.top-rated`);
const mostCommentNode = document.querySelector(`.most-commented`);

const renderFilters = function () {
  let filterHTML = ``;
  filterTypes.forEach(function (element) {
    let checked = false;
    if (element === `All`) {
      checked = true;
    }
    filterHTML += Object(_filter_template_js__WEBPACK_IMPORTED_MODULE_0__["getFilterElement"])(element, Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getRandomIntgr"])(1, 7), checked);
  });
  filtersNode.insertAdjacentHTML(`afterbegin`, filterHTML);
};

renderFilters();

/*
const renderCards = function (node, arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach((data) => {
    const card = new Card(data);
    const popup = new Popup(data);
    fragment.appendChild(card.render());

    card.onEdit = () => {
      popup.render();
      body.appendChild(popup.element);
      card.unrender();
    };

    popup.onEdit = () => {
      card.render();
      body.removeChild(popup.element);
      popup.unrender();
    };
  });

  node.appendChild(fragment);
};

renderCards(cardsNode, generateMovies(7));*/

const renderCard = function (node, data) {
  const card = new _card_js__WEBPACK_IMPORTED_MODULE_4__["Card"](data);
  const popup = new _popup_js__WEBPACK_IMPORTED_MODULE_5__["Popup"](data);
  node.appendChild(card.render());

  card.onEdit = () => {
    popup.render();
    body.appendChild(popup.element);
    card.unrender();
  };

  popup.onEdit = () => {
    card.render();
    body.removeChild(popup.element);
    popup.unrender();
  };
};

const renderCards = (count, node) => {
  for (let i = 0; i < count; i++) {
    const data = Object(_data_js__WEBPACK_IMPORTED_MODULE_3__["getMovie"])();
    renderCard(node, data);
  }
};
renderCards(7, cardsNode);
renderCards(2, topRatedNode);
renderCards(2, mostCommentNode);

/*
const get = function (count) {
  let arr = [];
  for (let i; i < count; i++) {
    const n = getMovie();
    console.log(n);
    arr.push(n);
  }
  console.log(arr);
};
get(5);*/

// renderCard(cardsNode);

/*
const renderCards = (count, node) => {
  for (let i = 0; i < count; i++) {
    renderCard(node);
  }
};*/

/*
renderCards(7, cardsNode);
renderCards(2, topRatedNode);
renderCards(2, mostCommentNode);*/

const filters = document.querySelectorAll(`.filter`);
filters.forEach((item) => {
  item.addEventListener(`click`, function () {
    cardsNode.innerHTML = ``;
    renderCards(Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getRandomIntgr"])(0, 10), cardsNode);
  });
});


/***/ }),

/***/ "./src/popup.js":
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
/*! exports provided: Popup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Popup", function() { return Popup; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


class Popup {
  constructor(data) {
    this._title = data.title;
    this._promoLine = data.promoLine;
    this._rating = data.rating;
    this._director = data.director;
    this._writer = data.writer;
    this._year = data.year;
    this._actors = data.actors;
    this._releaseDate = data.releaseDate;
    this._time = data.time;
    this._country = data.country;
    this._genre = data.genre;
    this._picture = data.picture;
    this._description = data.description;
    this._comments = data.comments;

    this._element = null;
  }

  _onCommentsLinkClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
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
          <img class="film-details__poster-img" src="images/posters/${this._picture}" alt="${this._title}">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">${this._promoLine}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
              <p class="film-details__user-rating">Your rate 8</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._writer}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${this._releaseDate} (${this._country})</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._time}</td>
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
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">1</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">😴</span>
            <div>
              <p class="film-details__comment-text">So long-long story, boring!</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Tim Macoveev</span>
                <span class="film-details__comment-day">3 days ago</span>
              </p>
            </div>
          </li>
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
        <div class="film-details__user-rating-controls">
          <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
          <button class="film-details__watched-reset" type="button">undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="images/posters/${this._picture}" alt="film-poster" class="film-details__user-rating-img">
          </div>

          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">${this._title}</h3>

            <p class="film-details__user-rating-feelings">How you feel it?</p>

            <div class="film-details__user-rating-score">
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
              <label class="film-details__user-rating-label" for="rating-1">1</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
              <label class="film-details__user-rating-label" for="rating-2">2</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
              <label class="film-details__user-rating-label" for="rating-3">3</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
              <label class="film-details__user-rating-label" for="rating-4">4</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5" checked>
              <label class="film-details__user-rating-label" for="rating-5">5</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
              <label class="film-details__user-rating-label" for="rating-6">6</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
              <label class="film-details__user-rating-label" for="rating-7">7</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
              <label class="film-details__user-rating-label" for="rating-8">8</label>

              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9">
              <label class="film-details__user-rating-label" for="rating-9">9</label>

            </div>
          </section>
        </div>
      </section>
    </form>
  </section>
  `.trim();
  }

  bind() {
    this._element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._onCommentsLinkClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this._onCommentsLinkClick);
  }

  render() {
    this._element = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getActors, randomDate, getPromo, createElement, getDesc, getRandomIntgr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActors", function() { return getActors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomDate", function() { return randomDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPromo", function() { return getPromo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDesc", function() { return getDesc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomIntgr", function() { return getRandomIntgr; });
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const shuffleArr = function (arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const getPromo = function (arr) {
  let shuffledArr = shuffleArr(arr);
  return shuffledArr.slice(0, getRandomIntgr(3, 5)).join(` `);
};

const getDesc = function (arr) {
  let shuffledArr = shuffleArr(arr);
  return shuffledArr.slice(0, getRandomIntgr(1, 3)).join(`. `) + `.`;
};

const getActors = function (arr) {
  let shuffledArr = shuffleArr(arr);
  return shuffledArr.slice(0, getRandomIntgr(1, 3)).join(`, `);
};

const getRandomIntgr = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const randomDate = function (start, end) {
  return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).toDateString();
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map