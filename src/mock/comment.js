import {getRandomBoolean, getRandomArrayItem} from '../utils/common.js';
import {EMOJI, TEXT} from '../const.js';

/**
 * Получить структуру комментария
 * @return {object} структура комментария
 */
const getComment = () => {
  const author = getRandomBoolean() ? `Tim Macoveev` : `John Doe`;

  return {
    id: String(new Date() + Math.random()),
    author,
    text: getRandomArrayItem(TEXT),
    emoji: getRandomArrayItem(EMOJI),
    date: new Date(),
  };
};

/**
 * Получить массив структур комментариев
 * @param  {number} count кол-во комментариев
 * @return {array} массив структур комментариев
 */
const getComments = (count) => {
  return new Array(count)
  .fill(null)
  .map(getComment);
};

export {getComments};
