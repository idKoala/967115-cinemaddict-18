const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const FilterType = {
  ALL: 'all',
  FAVOURITES: 'favourites',
  HISTORY: 'history',
  WATCHLIST: 'watchlist'
};

const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  COMMENTS_INIT: 'COMMENTS_INIT',
  COMMENT_DELETE: 'COMMENT_DELETE'
};

const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict/';
const AUTORIZATION = 'Basic hlamgen4wcl1sa2j';

export {SortType, FilterType, UserAction, UpdateType, END_POINT, AUTORIZATION};
