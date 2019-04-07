import {getRandomIntgr} from './utils.js';

const filtersArr = [
  {
    caption: `All`,
    amount: getRandomIntgr(1, 10),
    isChecked: true
  },
  {
    caption: `Watchlist`,
    amount: getRandomIntgr(1, 10),
    isChecked: false
  },
  {
    caption: `History`,
    amount: getRandomIntgr(1, 10),
    isChecked: false
  },
  {
    caption: `Favorites`,
    amount: getRandomIntgr(1, 10),
    isChecked: false
  }
];

export {filtersArr};
