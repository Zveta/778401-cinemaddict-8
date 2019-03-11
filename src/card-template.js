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

const getDesc = function (arr) {
  let shuffledArr = shuffleArr(arr);
  return shuffledArr.slice(0, getRandomIntgr(1, 3)).join(`. `) + `.`;
};

const getRandomIntgr = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const generateCard = function () {
  const movie = {
    title: [
      `Zero`,
      `One`,
      `Two`,
      `Three`,
      `Four`,
      `Five`,
      `Six`,
      `Seven`,
      `Eight`,
      `Nine`,
      `Ten`,
      `Star`,
      `Wars`,
      `Fantastic`,
      `Beasts`
    ][Math.floor(Math.random() * 15)],
    description: getDesc(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `)),
    picture: [`accused.jpg`, `blackmail.jpg`, `blue-blazes.jpg`, `fuga-da-new-york.jpg`, `moonrise.jpg`, `three-friends.jpg`][Math.floor(Math.random() * 6)],
    rating: (Math.random() * 10).toFixed(1),
    year: getRandomIntgr(1895, new Date().getFullYear()),
    time: getRandomIntgr(1, 3) + `h&nbsp;` + getRandomIntgr(1, 60) + `m`,
    genre: [
      `Action`,
      `Adventure`,
      `Animation`,
      `Biography`,
      `Comedy`,
      `Crime`,
      `Documentary`,
      `Drama`,
      `Fantasy`,
      `Horror`,
      `Mystery`,
      `Romance`,
      `Sci-Fi`,
      `Thriller`][Math.floor(Math.random() * 14)],
    comments: (getRandomIntgr(0, 100) === 1 ? getRandomIntgr(0, 100) + ` comment` : getRandomIntgr(0, 100) + ` comments`)
  };
  return movie;
};

const cardTemplate = function (movie) {
  return `
    <article class="film-card">
      <h3 class="film-card__title">${movie.title}</h3>
      <p class="film-card__rating">${movie.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${movie.year}</span>
        <span class="film-card__duration">${movie.time}</span>
        <span class="film-card__genre">${movie.genre}</span>
      </p>
      <img src="./images/posters/${movie.picture}" alt="" class="film-card__poster">
      <p class="film-card__description">${movie.description}</p>
      <button class="film-card__comments">${movie.comments}</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>
    </article>`;
};

export {cardTemplate, generateCard};
