import {getCards, filtersArr} from './data.js';
import {Card} from './card.js';
import {Popup} from './popup.js';
import {Filter} from './filter.js';
import {renderChart} from './stats.js';

const body = document.querySelector(`body`);
const cardsNode = document.querySelector(`.films-list__container`);
const filtersNode = document.querySelector(`.main-navigation`);
const statsBtn = document.querySelector(`.main-navigation__item--additional`);
const filmsSection = document.querySelector(`.films `);

const initialCards = getCards();

const updateCards = (cards, cardToUpdate, newCard) => {
  const index = cards.findIndex((it) => it === cardToUpdate);
  cards[index] = Object.assign({}, cardToUpdate, newCard);
  return cards[index];
};

const renderCards = (cards) => {
  for (let card of cards) {
    const cardComponent = new Card(card);
    const popupComponent = new Popup(card);

    cardComponent.onClick = () => {
      popupComponent.render();
      body.appendChild(popupComponent.element);
    };

    popupComponent.onClick = (newObject) => {
      const updatedCard = updateCards(cards, card, newObject);
      cardComponent.update(updatedCard);
      cardComponent.render();
      body.removeChild(popupComponent.element);
      popupComponent.unrender();
    };

    cardComponent.onAddToWatchList = (newObject) => {
      const updatedCard = updateCards(cards, card, newObject);
      card.isToWatch = newObject.isToWatch;
      const newCardComponent = cardComponent.update(updatedCard);
      body.replaceChild(cardComponent.element, newCardComponent.element);
    };

    cardComponent.onMarkAsWatched = (newObject) => {
      card.isWatched = newObject.isWatched;
    };

    cardsNode.appendChild(cardComponent.render());
  }
};

const renderFilters = function (filters) {
  for (const filter of filters) {
    const filterComponent = new Filter(filter);
    filtersNode.insertBefore(filterComponent.render(), statsBtn);
    filterComponent.onFilter = () => {
      cardsNode.innerHTML = ``;
      renderCards(filterCards(initialCards, filter.caption.toLowerCase()));
    };
  }
};

const filterCards = function (cards, filterType) {
  switch (filterType) {
    case `all`:
      return cards;

    case `watchlist`:
      return cards.filter((item) => item.isToWatch === true);

    case `history`:
      return cards.filter((item) => item.isWatched === true);

    default:
      return cards;
  }
};

const renderPage = function () {
  renderFilters(filtersArr);
  renderCards(initialCards);
};

renderPage();

const onStatsBtnClick = function (evt) {
  evt.preventDefault();
  filmsSection.classList.add(`visually-hidden`);
  renderChart(initialCards);
};
statsBtn.addEventListener(`click`, onStatsBtnClick);
