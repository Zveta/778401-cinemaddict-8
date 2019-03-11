import {getFilterElement} from './filter-template.js';
import {cardTemplate, generateCard} from './card-template.js';

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
    filterHTML += getFilterElement(element, getRandomIntgr(1, 7), checked);
  });
  filtersNode.insertAdjacentHTML(`afterbegin`, filterHTML);
};

renderFilters();

const renderCards = (count, node) => {
  let cardHTML = ``;
  for (let i = 0; i < count; i++) {
    cardHTML += cardTemplate(generateCard());
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
