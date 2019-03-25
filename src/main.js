import {getFilterElement} from './filter-template.js';
import {getRandomIntgr} from './utils.js';
import {getMovie} from './data.js';
import {Card} from './card.js';
import {Popup} from './popup.js';

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
    filterHTML += getFilterElement(element, getRandomIntgr(1, 7), checked);
  });
  filtersNode.insertAdjacentHTML(`afterbegin`, filterHTML);
};

renderFilters();

const renderCard = function (node, data) {
  const card = new Card(data);
  const popup = new Popup(data);
  node.appendChild(card.render());

  card.onClick = () => {
    popup.render();
    body.appendChild(popup.element);
  };

  popup.onClick = (newObject) => {
    card.userRating = newObject.userRating;
    card.comments = newObject.comments;
    card.render();
    body.removeChild(popup.element);
    popup.unrender();
  };
};

const renderCards = (count, node) => {
  for (let i = 0; i < count; i++) {
    const data = getMovie();
    renderCard(node, data);
  }
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
