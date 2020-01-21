import {RATING, ESC_KEYCODE} from '../const.js';

const siteMainElement = document.querySelector(`.main`);

const getRandomBoolean = () => Math.random() > 0.5;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

const getRandomDecimalNumber = (min, max) => {
  return (min + (max - min) * Math.random()).toFixed(1);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDay();
  const hours = targetDate.getHours() < 10 ? `0${targetDate.getHours()}` : targetDate.getHours();
  const minutes = targetDate.getMinutes() < 10 ? `0${targetDate.getMinutes()}` : targetDate.getMinutes();

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

/**
 * Получает звание пользователя
 * @param  {number} count кол-во просмотренных фильмов
 * @return {string} звание пользователя
 */
const getRating = (count) => {
  let result = ``;
  if (count > 1 && count <= 10) {
    result = RATING[0];
  } else if (count > 10 && count <= 20) {
    result = RATING[1];
  } else if (count > 21) {
    result = RATING[2];
  }
  return result;
};

const isEscEvent = (evt) => {
  return evt.keyCode === ESC_KEYCODE;
};

/**
 * Сортирует массив фильмов по уменьшению рейтинга
 * @param  {array} arr массив фильмов
 */
const sortByRating = (arr) => {
  arr.sort((a, b) => b.rating - a.rating);
};

/**
 * Сортирует массив фильмов по уменьшению кол-ва комментариев
 * @param  {array} arr массив фильмов
 */
const sortByComments = (arr) => {
  arr.sort((a, b) => b.comments.length - a.comments.length);
};

/**
 * Вычисляет кол-во фильмов соответствующих фильтру
 * @param  {Array} movies массив фильмов
 * @param  {string} property свойство карточки фильма под фильтр
 * @return {number} кол-во фильмов соответствующих фильтру
 */
const getFilterCount = (movies, property) => {
  const filter = movies.filter((card) => card[property]);
  return filter.length;
};

export {
  getRandomArrayItem,
  getRandomBoolean,
  getRandomDecimalNumber,
  getRandomIntegerNumber,
  getRandomDate,
  getRating,
  isEscEvent,
  siteMainElement,
  sortByRating,
  sortByComments,
  getFilterCount
};
