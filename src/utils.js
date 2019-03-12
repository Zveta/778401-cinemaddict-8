const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const shuffleArr = function (arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

const getPromo = function (arr) {
  let shuffledArr = shuffleArr(arr);
  return shuffledArr.slice(0, getRandomIntgr(3, 5)).join(` `);
};

const getDesc = function (arr) {
  let shuffledArr = shuffleArr(arr);
  return shuffledArr.slice(0, getRandomIntgr(1, 3)).join(`. `) + `.`;
};

const getActors = function (arr) {
  let shuffledArr = shuffleArr(arr);
  return shuffledArr.slice(0, getRandomIntgr(1, 3)).join(`, `);
};

const getRandomIntgr = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const randomDate = function (start, end) {
  return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).toDateString();
};

export {getActors, randomDate, getPromo, createElement, getDesc, getRandomIntgr};
