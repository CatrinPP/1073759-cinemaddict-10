import {getRandomBoolean, getRandomArrayItem, getRandomDate} from '../utils.js';

const Text = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const Emoji = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/trophy.png`,
];

/**
 * Получить структуру комментария
 * @return {object} {структура комментария}
 */
const getComment = () => {
  const author = getRandomBoolean() ? `Tim Macoveev` : `John Doe`;

  return {
    author,
    text: getRandomArrayItem(Text),
    emoji: getRandomArrayItem(Emoji),
    date: getRandomDate()
  };
};

/**
 * Получить массив структур комментариев
 * @param  {number} count {кол-во комментариев}
 * @return {array} {массив структур комментариев}
 */
const getComments = (count) => {
  return new Array(count)
  .fill(``)
  .map(getComment);
};

export {getComments};
