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

/***/ "./src/card-template.js":
/*!******************************!*\
  !*** ./src/card-template.js ***!
  \******************************/
/*! exports provided: cardTemplate, generateCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cardTemplate", function() { return cardTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCard", function() { return generateCard; });
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

const getDesc = function (arr) {
  let shuffledArr = shuffleArr(arr);
  return shuffledArr.slice(0, getRandomIntgr(1, 3)).join(`. `) + `.`;
};

const getRandomIntgr = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const generateCard = function () {
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
    description: getDesc(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `)),
    picture: [`accused.jpg`, `blackmail.jpg`, `blue-blazes.jpg`, `fuga-da-new-york.jpg`, `moonrise.jpg`, `three-friends.jpg`][Math.floor(Math.random() * 6)],
    rating: (Math.random() * 10).toFixed(1),
    year: getRandomIntgr(1895, new Date().getFullYear()),
    time: getRandomIntgr(1, 3) + `h&nbsp;` + getRandomIntgr(1, 60) + `m`,
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
    comments: (getRandomIntgr(0, 100) === 1 ? getRandomIntgr(0, 100) + ` comment` : getRandomIntgr(0, 100) + ` comments`)
  };
  return movie;
};

const cardTemplate = function (movie) {
  return `
    <article class="film-card">
      <h3 class="film-card__title">${movie.title}</h3>
      <p class="film-card__rating">${movie.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${movie.year}</span>
        <span class="film-card__duration">${movie.time}</span>
        <span class="film-card__genre">${movie.genre}</span>
      </p>
      <img src="./images/posters/${movie.picture}" alt="" class="film-card__poster">
      <p class="film-card__description">${movie.description}</p>
      <button class="film-card__comments">${movie.comments}</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`;
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

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter_template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-template.js */ "./src/filter-template.js");
/* harmony import */ var _card_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card-template.js */ "./src/card-template.js");



const filterTypes = [`All`, `Watchlist`, `History`, `Favorites`];
const cardsNode = document.querySelector(`.films-list__container`);
const filtersNode = document.querySelector(`.main-navigation`);
const topRatedNode = document.querySelector(`.top-rated`);
const mostCommentNode = document.querySelector(`.most-commented`);

const getRandomIntgr = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const renderFilters = function () {
  let filterHTML = ``;
  filterTypes.forEach(function (element) {
    let checked = false;
    if (element === `All`) {
      checked = true;
    }
    filterHTML += Object(_filter_template_js__WEBPACK_IMPORTED_MODULE_0__["getFilterElement"])(element, getRandomIntgr(1, 7), checked);
  });
  filtersNode.insertAdjacentHTML(`afterbegin`, filterHTML);
};

renderFilters();

const renderCards = (count, node) => {
  let cardHTML = ``;
  for (let i = 0; i < count; i++) {
    cardHTML += Object(_card_template_js__WEBPACK_IMPORTED_MODULE_1__["cardTemplate"])(Object(_card_template_js__WEBPACK_IMPORTED_MODULE_1__["generateCard"])());
  }
  node.innerHTML = cardHTML;
};

renderCards(7, cardsNode);
renderCards(2, topRatedNode);
renderCards(2, mostCommentNode);

const filters = document.querySelectorAll(`.filter`);
filters.forEach((item) => {
  item.addEventListener(`click`, function () {
    cardsNode.innerHTML = ``;
    renderCards(getRandomIntgr(0, 10), cardsNode);
  });
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map