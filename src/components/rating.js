/**
 * Создает html-код блока звания пользователя по шаблону
 * @param  {string} rating звание пользователя
 * @return {string} html-код блока звания пользователя
 */
const createRatingTemplate = (rating) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createRatingTemplate};
