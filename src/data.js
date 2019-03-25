import {getActors, randomDate, getPromo, getDesc, getRandomIntgr} from './utils.js';

const getMovie = function () {
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
    promoLine: getPromo(`Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit`.split(` `)),
    description: getDesc(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `)),
    picture: [`accused.jpg`, `blackmail.jpg`, `blue-blazes.jpg`, `fuga-da-new-york.jpg`, `moonrise.jpg`, `three-friends.jpg`][Math.floor(Math.random() * 6)],
    rating: (Math.random() * 10).toFixed(1),
    year: getRandomIntgr(1896, new Date().getFullYear()) + `-` + getRandomIntgr(1, 12) + `-` + getRandomIntgr(1, 31),
    time: getRandomIntgr(0, 23) + `:` + getRandomIntgr(0, 59),
    director: [
      `Emmaline Humbertson`,
      `Herb Hopp`,
      `Candis Heimer`,
      `Jamey Fonda`,
      `Mirian Grose`
    ][Math.floor(Math.random() * 5)],
    writer: [
      `Emmaline Humbertson`,
      `Herb Hopp`,
      `Candis Heimer`,
      `Jamey Fonda`,
      `Mirian Grose`
    ][Math.floor(Math.random() * 5)],
    actors: getActors([
      `Elizebeth Haig`,
      `Azalee Lebrun`,
      `Ty Loken`,
      `Yolonda Flagler`,
      `Jone Dagenais`,
      `Armand Madere`,
      `Lorine Depaola`,
      `Maryanna Herndon`,
      `Otha Dimauro`,
      `Jenniffer Bayley`]),
    releaseDate: randomDate(new Date(1896, 0, 1), new Date()),
    country: [
      `Russia`,
      `USA`,
      `Italy`,
      `France`,
      `Germany`,
      `Spain`,
      `Canada`,
      `Hungary`,
      `Great Britain`,
      `Belgium`
    ][Math.floor(Math.random() * 10)],
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
    comments: [
      {
        emoji: `😴`,
        text: `So long-long story, boring!`,
        author: `Tim Macoveev`,
        date: getRandomIntgr(1, 29) + `days ago`,
      }
    ]
  };
  return movie;
};

/*
const generateMovies = function (amount) {
  let movies = [];
  for (let i = 0; i < amount; i++) {
    movies.push(getMovie());
  }
  return movies;
};*/

export {getMovie};
