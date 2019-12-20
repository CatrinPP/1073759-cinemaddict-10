import {CARDS_COUNT, POSTER_ITEMS, GENRE_ITEMS, DESCRIPTION_ITEMS, TITLE_ITEMS} from '../const.js';
import {getRandomArrayItem, getRandomBoolean, getRandomDecimalNumber, getRandomIntegerNumber} from '../utils.js';
import {getComments} from '../mock/comment.js';

/**
 * Генерирует название фильма
 * @return {string} {название фильма}
 */
const generateTitle = () => {
  let title = getRandomArrayItem(TITLE_ITEMS).split(` `);
  const randomIndex = getRandomIntegerNumber(0, title.length - 1);
  title[randomIndex] = title[randomIndex].endsWith(`,`) ? `Олег, ` : `Олег`;
  return title.join(` `);
};

/**
 * Получает длительность фильма случайным образом
 * @return {string} {длительность фильма}
 */
const getDuration = () => {
  const hours = `${getRandomIntegerNumber(0, 2)}h `;
  const minutes = `${getRandomIntegerNumber(1, 59)}m`;
  let duration = `${hours}${minutes}`;
  if (hours === `0h `) {
    return minutes;
  }
  return duration;
};

/**
 * Получает описание фильма случайным набором предложений
 * @return {string} описание фильма}
 */
const getDescription = () => {
  let description = null;
  const descriptionLength = getRandomIntegerNumber(1, 3);
  for (let i = 0; i < descriptionLength; i++) {
    description += ` ` + getRandomArrayItem(DESCRIPTION_ITEMS);
  }
  return description;
};

/**
 * Генерирует структуру карточки фильма
 * @return {object} {структура карточки фильма}
 */
const generateCard = () => {
  const title = generateTitle();
  const year = getRandomIntegerNumber(1970, 2019);
  const genres = GENRE_ITEMS.filter(() => Math.random() > 0.5);

  return {
    title,
    rating: getRandomDecimalNumber(2, 10),
    year,
    duration: getDuration(),
    genres,
    poster: getRandomArrayItem(POSTER_ITEMS),
    description: getDescription(),
    comments: getComments(getRandomIntegerNumber(0, 20)),
    isAddedToWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    originalTitle: title,
    director: `Anthony Mann`,
    writers: [`Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    releaseDate: `1 April ${year}`,
    country: `USA`,
    age: `18+`,
  };
};

/**
 * Генерирует массив структур карточек фильмов
 * @return {array} {массив структур карточек фильмов}
 */
const generateCards = () => {
  return new Array(CARDS_COUNT)
    .fill(null)
    .map(generateCard);
};

export {generateCards};
