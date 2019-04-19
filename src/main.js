import {filtersArr} from './data.js';
import {Card} from './card.js';
import {Popup} from './popup.js';
import {Filter} from './filter.js';
import {Search} from './search.js';
import {renderChart} from './stats.js';
import {API} from './backend.js';
import {getMostCommented, getTopRated} from './extra-cards.js';
import moment from 'moment';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

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
loadMessage.style.textAlign = `center`;
loadErrorMessage.style.textAlign = `center`;


const CARDS_SET = 5;

const renderFooterStats = function (cards) {
  const footerStats = document.querySelector(`.footer__statistics`);
  footerStats.innerHTML = `<p>${cards.length > 1 ? `${cards.length} movies` : `${cards.length} movie`} inside</p>`;
};

const renderProfileRating = function (cards) {
  const watchedMovies = cards.filter((item) => item.isWatched === true);
  let profileRating = ``;
  if (watchedMovies.length >= 20) {
    profileRating = `movie buff`;
  } else if (watchedMovies.length > 10 && watchedMovies.length < 20) {
    profileRating = `fan`;
  } else {
    profileRating = `novice`;
  }
  const profileRatingField = document.querySelector(`.profile__rating`);
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

    cardComponent.onMarkAsFavorite = () => {
      card.isFavorite = !card.isFavorite;
      api.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };

    popupComponent.onPopupClose = () => {
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

    popupComponent.onPopupEsc = () => {
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

    popupComponent.onAddComment = (newData) => {
      card.comments = newData;
      popupComponent.blockComments();
      api.updateCard({id: card.id, data: card.toRAW()})
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
      api.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };

    popupComponent.onMarkAsWatched = () => {
      card.isWatched = !card.isWatched;
      api.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };

    popupComponent.onMarkAsFavorite = () => {
      card.isFavorite = !card.isFavorite;
      api.updateCard({id: card.id, data: card.toRAW()})
      .then((newCard) => {
        cardComponent.update(newCard);
      });
    };

    const getCardNode = function () {
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
    filterComponent.getFilterAmount(filteredCards);
    filtersNode.insertBefore(filterComponent.element, statsBtn);
    filterComponent.onFilter = () => {
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

const filterCards = function (cards, filterType) {
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

const renderSearch = function (cards) {
  const searchInput = new Search();
  logo.insertAdjacentElement(`afterend`, searchInput.render());
  searchInput.onSearch = (value) => {
    const searchedCards = cards.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
    cardsNode.innerHTML = ``;
    renderBySets(searchedCards);
  };
};

const renderBySets = function (cards) {
  let copiedArr = [];
  copiedArr = cards.concat();
  renderCards(copiedArr.splice(0, CARDS_SET), cardsNode);
  const onShowMoreClick = function () {
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

api.getCards()
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

  const onStatsBtnClick = function (evt) {
    evt.preventDefault();
    filmsSection.classList.add(`visually-hidden`);
    statsSection.classList.remove(`visually-hidden`);
    renderChart(initialCards);
  };
  const dayPeriod = document.getElementById(`statistic-today`);
  dayPeriod.addEventListener(`change`, function () {
    renderChart(cards.filter((item) => moment(item.watchingDate) === moment().subtract(1, `days`)));
  });
  const weekPeriod = document.getElementById(`statistic-week`);
  weekPeriod.addEventListener(`change`, function () {
    renderChart(cards.filter((item) => moment(item.watchingDate) > moment().subtract(7, `days`)));
  });
  const yearPeriod = document.getElementById(`statistic-year`);
  yearPeriod.addEventListener(`change`, function () {
    renderChart(cards.filter((item) => moment(item.watchingDate) > moment().subtract(1, `years`)));
  });
  const monthPeriod = document.getElementById(`statistic-month`);
  monthPeriod.addEventListener(`change`, function () {
    renderChart(cards.filter((item) => moment(item.watchingDate) > moment().subtract(1, `months`)));
  });
  const allTimePeriod = document.getElementById(`statistic-all-time`);
  allTimePeriod.addEventListener(`change`, function () {
    renderChart(cards);
  });
  statsBtn.addEventListener(`click`, onStatsBtnClick);
}).catch(() => {
  loadMessage.remove();
  loadErrorMessage.classList.remove(`visually-hidden`);
});
