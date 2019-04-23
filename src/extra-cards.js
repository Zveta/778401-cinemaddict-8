const getMostCommented = (cards) => {
  let localCards = cards.slice();
  const sorted = localCards.sort((a, b) => b.comments.length - a.comments.length);
  const result = sorted.slice(0, 2);
  return result;
};

const getTopRated = (cards) => {
  let localCards = cards.slice();
  const sorted = localCards.sort((a, b) => b.rating - a.rating);
  const result = sorted.slice(0, 2);
  return result;
};

export {getMostCommented, getTopRated};
