import {CARDS_COUNT} from '../const.js';
import {getRandomArrayItem, getRandomBoolean, getRandomDecimalNumber, getRandomIntegerNumber} from '../utils.js';

const TitleItems = [
  `101 долматинец`,
  `Вики, Кристина, Барселона`,
  `Поймай меня, если сможешь`,
  `Тупой и ещё тупее`,
  `Крестный отец`,
  `Один дома`,
  `Тот самый Мюнхгаузен`,
  `Всегда говори да`,
  `Бойцовский клуб`,
  `Красавица и чудовище`,
  `Хороший, плохой, злой`,
  `Крепкий орешек`,
  `Любовь и голуби`,
  `Безумно влюблённый`,
  `Старик Хоттабыч`,
];

const PosterItems = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const DescriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const GenreItems = [
  `Боевик`,
  `Вестерн`,
  `Драма`,
  `Исторический`,
  `Комедия`,
  `Мультик`,
  `Триллер`,
  `Приключения`,
  `Фантастика`,
];

/**
 * Генерирует название фильма
 * @return {string} {название фильма}
 */
const generateTitle = () => {
  let title = getRandomArrayItem(TitleItems).split(` `);
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
    duration = minutes;
  }
  return duration;
};

/**
 * Получает описание фильма случайным набором предложений
 * @return {string} описание фильма}
 */
const getDescription = () => {
  let description = ``;
  const descriptionLength = getRandomIntegerNumber(1, 3);
  for (let i = 0; i < descriptionLength; i++) {
    description += ` ` + getRandomArrayItem(DescriptionItems);
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
  const genres = GenreItems.filter(() => Math.random() > 0.5);

  return {
    title,
    rating: getRandomDecimalNumber(2, 10),
    year,
    duration: getDuration(),
    genres,
    poster: getRandomArrayItem(PosterItems),
    description: getDescription(),
    comments: getRandomIntegerNumber(0, 20),
    isAddedToWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavourite: getRandomBoolean(),
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
    .fill(``)
    .map(generateCard);
};

export {generateCards};
