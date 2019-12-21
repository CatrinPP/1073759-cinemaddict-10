/**
 * Создает html-код каталога фильмов по шаблону
 * @return {string} html-код каталога фильмов
 */
const createFilmsListTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>

    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

/**
 * Создает html-код доп.блока фильмов по шаблону
 * @param {string} title название блока
 * @return {string} html-код доп.блока
 */
const createSpecialListTemplate = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container  ${title.substring(0, 3).toLowerCase()}-container"></div>
    </section>`
  );
};

export {createFilmsListTemplate, createSpecialListTemplate};
