import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const filmsListTitleText = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.FAVOURITES]: 'There are no favorite movies now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.WATCHLIST]: 'There are no movies to watch now'
}

const createFilmsListTitleTemplate = (filterType) => 
  { const emptyListMessage = filmsListTitleText[filterType];
    
    return `<h2 class="films-list__title">${emptyListMessage}</h2>`};

export default class FilmsListTitleView extends AbstractView {
  #filterType = null;

  constructor (filterType) {
    super();
    this.#filterType = filterType;
  }
  
  get template () {
    return createFilmsListTitleTemplate(this.#filterType);
  }


}
