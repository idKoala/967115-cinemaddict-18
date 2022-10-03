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
  UPDATE_MOVIE: 'UPDATE_MOVIE'
}

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
}

export {SortType, FilterType, UserAction, UpdateType};
