import {getFilterElement} from './filter-template.js';
import {getRandomIntgr} from './utils.js';
// import {generateMovies} from './generate-movies.js';
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

// Еще один вариант отрисовки всех карточек

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
  const card = new Card(data);
  const popup = new Popup(data);
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
    const data = getMovie();
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
    renderCards(getRandomIntgr(0, 10), cardsNode);
  });
});
