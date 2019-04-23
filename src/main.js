import {filtersArr} from './data.js';
import Card from './card.js';
import Popup from './popup.js';
import Filter from './filter.js';
import Search from './search.js';
import {renderChart} from './stats.js';
import API from './backend.js';
import Provider from './provider.js';
import Store from './store.js';
import {getMostCommented, getTopRated} from './extra-cards.js';
import moment from 'moment';

const CARDS_SET = 5;
const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const CARDS_STORE_KEY = `cards-store-key`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
const store = new Store({key: CARDS_STORE_KEY, storage: localStorage});
const provider = new Provider({api, store, generateId: () => String(Date.now())});

const body = document.querySelector(`body`);
const cardsNode = document.querySelector(`.films-list__container`);
const filtersNode = document.querySelector(`.main-navigation`);
const statsBtn = document.querySelector(`.main-navigation__item--additional`);
const filmsSection = document.querySelector(`.films `);
const topRatedNode = document.querySelector(`.top-rated`);
const mostCommentNode = document.querySelector(`.most-commented`);
const logo = document.querySelector(`.header__logo`);
const showMoreBtn = document.querySelector(`.films-list__show-more`);
const statsSection = document.querySelector(`.statistic `);
const loadMessage = document.querySelector(`.films-list__load`);
const loadErrorMessage = document.querySelector(`.films-list__load-error`);
const dayPeriod = document.querySelector(`#statistic-today`);
const weekPeriod = document.querySelector(`#statistic-week`);
const monthPeriod = document.querySelector(`#statistic-month`);
const yearPeriod = document.querySelector(`#statistic-year`);
const allTimePeriod = document.querySelector(`#statistic-all-time`);
const footerStats = document.querySelector(`.footer__statistics`);
const profileRatingField = document.querySelector(`.profile__rating`);

loadMessage.style.textAlign = `center`;
loadErrorMessage.style.textAlign = `center`;

const renderFooterStats = (cards) => {
  footerStats.innerHTML = `<p>${cards.length > 1 ? `${cards.length} movies` : `${cards.length} movie`} inside</p>`;
};

const renderProfileRating = (cards) => {
  const watchedMovies = cards.filter((item) => item.isWatched === true);
  let profileRating = ``;
  if (watchedMovies.length >= 20) {
    profileRating = `movie buff`;
  } else if (watchedMovies.length > 10 && watchedMovies.length < 20) {
    profileRating = `fan`;
  } else {
    profileRating = `novice`;
  }
  profileRatingField.textContent = profileRating;
};

const renderCards = (cards, node) => {
  for (let card of cards) {
    const cardComponent = new Card(card);
    const popupComponent = new Popup(card);

    cardComponent.onClick = () => {
      popupComponent.render();
      body.appendChild(popupComponent.element);
    };

    cardComponent.onAddToWatchList = () => {
      card.isWatchlist = !card.isWatchlist;
      provider.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };

    cardComponent.onMarkAsWatched = () => {
      card.isWatched = !card.isWatched;
      provider.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };

    cardComponent.onMarkAsFavorite = () => {
      card.isFavorite = !card.isFavorite;
      provider.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };

    popupComponent.onClose = () => {
      provider.updateCard({id: card.id, data: card.toRAW()})
      .then((newData) => {
        cardComponent.update(newData);
        cardComponent.render();
        body.removeChild(popupComponent.element);
        popupComponent.unrender();
      })
      .catch((err) => {
        throw err;
      });
    };

    popupComponent.onEsc = () => {
      provider.updateCard({id: card.id, data: card.toRAW()})
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

    popupComponent.onAddComment = (newData) => {
      card.comments = newData;
      popupComponent.blockComments();
      provider.updateCard({id: card.id, data: card.toRAW()})
      .then(() => {
        popupComponent.update(card);
        cardComponent.update(card);
        popupComponent.unblockComments();
      })
      .catch(() => {
        popupComponent.shake();
        popupComponent.shakeComment();
        popupComponent.unblockComments();
      });
    };

    popupComponent.onAddToWatchList = () => {
      card.isWatchlist = !card.isWatchlist;
      provider.updateCard({id: card.id, data: card.toRAW()})
      .then(() => {
        cardComponent.update(card);
        popupComponent.update(card);
      });
    };

    popupComponent.onMarkAsWatched = () => {
      card.isWatched = !card.isWatched;
      provider.updateCard({id: card.id, data: card.toRAW()})
      .then(() => {
        cardComponent.update(card);
        popupComponent.update(card);
      });
    };

    popupComponent.onMarkAsFavorite = () => {
      card.isFavorite = !card.isFavorite;
      provider.updateCard({id: card.id, data: card.toRAW()})
      .then(() => {
        cardComponent.update(card);
        popupComponent.update(card);
      });
    };

    const getCardNode = () => {
      let cardNode;
      if (node !== cardsNode) {
        cardNode = cardComponent.render();
        cardNode.querySelector(`.film-card__controls`).classList.add(`visually-hidden`);
      } else {
        cardNode = cardComponent.render();
      }
      return cardNode;
    };
    node.appendChild(getCardNode());
  }
};

const renderFilters = function (filters, initialCards) {
  for (const filter of filters) {
    const filterComponent = new Filter(filter);
    filterComponent.render();
    const filteredCards = filterCards(initialCards, filter.caption.toLowerCase());
    filterComponent.getAmount(filteredCards);
    filtersNode.insertBefore(filterComponent.element, statsBtn);
    filterComponent.onClick = () => {
      cardsNode.innerHTML = ``;
      if (showMoreBtn.classList.contains(`visually-hidden`)) {
        showMoreBtn.classList.remove(`visually-hidden`);
      }
      document.querySelectorAll(`.main-navigation__item`).forEach((item) => item.classList.remove(`main-navigation__item--active`));
      filterComponent.element.classList.add(`main-navigation__item--active`);
      filterComponent.element.querySelector(`.main-navigation__item-count`).innerHTML = filterCards(initialCards, filter.caption.toLowerCase()).length;
      renderBySets(filterCards(initialCards, filter.caption.toLowerCase()));
      if (filmsSection.classList.contains(`visually-hidden`) && statsSection !== null) {
        filmsSection.classList.remove(`visually-hidden`);
        statsSection.classList.add(`visually-hidden`);
      }
    };
  }
};

const filterCards = (cards, filterType) => {
  switch (filterType) {
    case `all`:
      return cards;

    case `watchlist`:
      return cards.filter((item) => item.isWatchlist === true);

    case `history`:
      return cards.filter((item) => item.isWatched === true);

    case `favorites`:
      return cards.filter((item) => item.isFavorite === true);

    default:
      return cards;
  }
};

const renderSearch = (cards) => {
  const searchInput = new Search();
  logo.insertAdjacentElement(`afterend`, searchInput.render());
  searchInput.onChange = (value) => {
    const searchedCards = cards.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
    cardsNode.innerHTML = ``;
    renderBySets(searchedCards);
  };
};

const renderBySets = (cards) => {
  let copiedArr = [];
  copiedArr = cards.concat();
  renderCards(copiedArr.splice(0, CARDS_SET), cardsNode);
  const onShowMoreClick = () => {
    if (copiedArr.length > CARDS_SET) {
      renderCards(copiedArr.splice(0, CARDS_SET), cardsNode);
    } else if (copiedArr.length <= CARDS_SET) {
      renderCards(copiedArr.splice(0, CARDS_SET), cardsNode);
      showMoreBtn.classList.add(`visually-hidden`);
      showMoreBtn.removeEventListener(`click`, onShowMoreClick);
    }
  };
  if (copiedArr <= CARDS_SET) {
    renderCards(copiedArr, cardsNode);
    showMoreBtn.classList.add(`visually-hidden`);
    showMoreBtn.removeEventListener(`click`, onShowMoreClick);
  }
  showMoreBtn.addEventListener(`click`, onShowMoreClick);
};

provider.getCards()
.then((cards) => {
  const initialCards = cards;
  loadMessage.remove();
  renderFooterStats(initialCards);
  renderProfileRating(initialCards);
  renderBySets(initialCards);
  renderCards(getMostCommented(initialCards), mostCommentNode);
  renderCards(getTopRated(initialCards), topRatedNode);
  renderFilters(filtersArr, initialCards);
  renderSearch(initialCards);

  const onStatsBtnClick = (evt) => {
    evt.preventDefault();
    filmsSection.classList.add(`visually-hidden`);
    statsSection.classList.remove(`visually-hidden`);
    renderChart(initialCards);
  };
  dayPeriod.addEventListener(`change`, () => renderChart(cards.filter((item) => moment(item.watchingDate) === moment().subtract(1, `days`))));
  weekPeriod.addEventListener(`change`, () => renderChart(cards.filter((item) => moment(item.watchingDate) > moment().subtract(7, `days`))));
  yearPeriod.addEventListener(`change`, () => renderChart(cards.filter((item) => moment(item.watchingDate) > moment().subtract(1, `years`))));
  monthPeriod.addEventListener(`change`, () => renderChart(cards.filter((item) => moment(item.watchingDate) > moment().subtract(1, `months`))));
  allTimePeriod.addEventListener(`change`, () => renderChart(cards));
  statsBtn.addEventListener(`click`, onStatsBtnClick);
}).catch(() => {
  loadMessage.remove();
  loadErrorMessage.classList.remove(`visually-hidden`);
});

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncCards();
});
