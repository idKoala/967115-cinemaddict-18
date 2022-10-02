import {Filter} from '../utils.js';

export const generateFilter = (movies) => Object.entries(Filter).map(
  ([filterName, filterMovies]) => ({
    name: filterName,
    count: filterMovies(movies).length
  })
);
