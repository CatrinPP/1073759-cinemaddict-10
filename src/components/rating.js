import {RATING} from '../const.js';

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

/**
 * Создает html-код блока звания пользователя по шаблону
 * @param  {string} rating {звание пользователя}
 * @return {string} {html-код блока звания пользователя}
 */
const createRatingTemplate = (rating) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {getRating, createRatingTemplate};
