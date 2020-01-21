const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;
const CARDS_COUNT_ADDITIONAL = 2;
const CARDS_COUNT = 15;
const ESC_KEYCODE = 27;

const RATING = [
  `Novice`,
  `Fan`,
  `Movie Buff`,
];

const POSTER_ITEMS = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const GENRE_ITEMS = [
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

const DESCRIPTION_ITEMS = [
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

const TITLE_ITEMS = [
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

const TEXT = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const EMOJI = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/trophy.png`,
];

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export {
  RATING,
  CARDS_COUNT,
  SHOWING_CARDS_COUNT_BY_BUTTON,
  SHOWING_CARDS_COUNT_ON_START,
  CARDS_COUNT_ADDITIONAL,
  EMOJI,
  POSTER_ITEMS,
  GENRE_ITEMS,
  DESCRIPTION_ITEMS,
  TITLE_ITEMS,
  TEXT,
  ESC_KEYCODE,
  FilterType
};
