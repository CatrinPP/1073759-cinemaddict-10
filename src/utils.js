import {RATING} from './const.js';

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
 * @param  {number} count {кол-во просмотренных фильмов}
 * @return {string} {звание пользователя}
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

export {getRandomArrayItem, getRandomBoolean, getRandomDecimalNumber, getRandomIntegerNumber, getRandomDate, getRating};
