const getMostCommented = function (cards) {
  let localCards = cards.slice();
  const sorted = localCards.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });
  const result = sorted.slice(0, 2);
  return result;
};

const getTopRated = function (cards) {
  let localCards = cards.slice();
  const sorted = localCards.sort(function (a, b) {
    return b.rating - a.rating;
  });
  const result = sorted.slice(0, 2);
  return result;
};

export {getMostCommented, getTopRated};

