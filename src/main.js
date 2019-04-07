import {filtersArr} from './data.js';
import {Card} from './card.js';
import {Popup} from './popup.js';
import {Filter} from './filter.js';
import {renderChart} from './stats.js';
import {API} from './backend.js';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const body = document.querySelector(`body`);
const cardsNode = document.querySelector(`.films-list__container`);
const filtersNode = document.querySelector(`.main-navigation`);
const statsBtn = document.querySelector(`.main-navigation__item--additional`);
const filmsSection = document.querySelector(`.films `);

const renderCards = (cards) => {
  for (let card of cards) {
    const cardComponent = new Card(card);
    const popupComponent = new Popup(card);

    cardComponent.onClick = () => {
      popupComponent.render();
      body.appendChild(popupComponent.element);
    };

    cardComponent.onAddToWatchList = () => {
      card.isWatchlist = !card.isWatchlist;
      api.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };
    cardComponent.onMarkAsWatched = () => {
      card.isWatched = !card.isWatched;
      api.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };

    popupComponent.onClick = (newObject) => {
      card.comments = newObject.comments;
      card.userRating = newObject.userRating;
      api.updateCard({id: card.id, data: card.toRAW()})
      .then(() => {
        cardComponent.update(card);
        cardComponent.render();
        body.removeChild(popupComponent.element);
        popupComponent.unrender();
      })
      .catch((err) => {
        throw err;
      });
    };

    cardsNode.appendChild(cardComponent.render());
  }
};

const renderFilters = function (filters, initialCards) {
  for (const filter of filters) {
    const filterComponent = new Filter(filter);
    filtersNode.insertBefore(filterComponent.render(), statsBtn);
    filterComponent.onFilter = () => {
      const statsSection = document.querySelector(`.statistic `);
      cardsNode.innerHTML = ``;
      renderCards(filterCards(initialCards, filter.caption.toLowerCase()));
      if (filmsSection.classList.contains(`visually-hidden`) && statsSection !== null) {
        filmsSection.classList.remove(`visually-hidden`);
        statsSection.classList.add(`visually-hidden`);
      }
    };
  }
};

const filterCards = function (cards, filterType) {
  switch (filterType) {
    case `all`:
      return cards;

    case `watchlist`:
      return cards.filter((item) => item.isWatchlist === true);

    case `history`:
      return cards.filter((item) => item.isWatched === true);

    default:
      return cards;
  }
};

api.getCards()
.then((cards) => {
  const initialCards = cards;
  renderCards(initialCards);
  renderFilters(filtersArr, initialCards);
  const onStatsBtnClick = function (evt) {
    evt.preventDefault();
    filmsSection.classList.add(`visually-hidden`);
    renderChart(initialCards);
  };
  statsBtn.addEventListener(`click`, onStatsBtnClick);
});
