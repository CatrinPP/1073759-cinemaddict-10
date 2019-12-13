/**
 * Создает html-код меню сайта по шаблону
 * @param  {object} filters {объект с количеством фильмов под каждым фильтром}
 * @return {string} {html-код меню}
 */
const createSiteMenuTemplate = (filters) => {
  const {watchlistCount, historyCount, favouritesCount} = filters;

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favouritesCount}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export {createSiteMenuTemplate};
