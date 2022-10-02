import dayjs from 'dayjs';
import {FilterType} from './const.js';

const MINUTES_IN_HOUR = 60;

const Filter = {
  [FilterType.FAVOURITES]: (movies) => movies.filter((movie) => movie.user_details.favorite),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.user_details.alreadyWatched),
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.user_details.wishlist)
};

const getYearFromDate = (date) => dayjs(date).format('YYYY');
const getDayMonthYearFromDate = (date) => dayjs(date).format('D MMMM YYYY');
const getDateTimeFromDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const convertMinutesToHoursMinutes = (minutes) =>
  `${Math.floor(minutes / MINUTES_IN_HOUR)}h ${minutes % MINUTES_IN_HOUR}m`;

const getRandomToFixedOne = (a = 0, b = 1) => {
  const lower = Math.floor(Math.min(a, b));
  const upper = Math.ceil(Math.max(a, b));

  return (lower + Math.random() * (upper - lower)).toFixed(1);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const gerRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const getRandomSubArray = (arr) => {
  const shuffled = arr.slice();
  let swap, index, i = arr.length;
  while (i--) {
    index = Math.floor(Math.random() * (i + 1));
    swap = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = swap;
  }
  const shuffledArr = shuffled.slice(0, getRandomInteger(0, shuffled.length));
  const shuffledSet = new Set(shuffledArr);

  return Array.from(shuffledSet);
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};


const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export {getYearFromDate,
  convertMinutesToHoursMinutes,
  getRandomInteger,
  getDayMonthYearFromDate,
  getDateTimeFromDate,
  gerRandomArrayElement,
  getRandomSubArray,
  updateItem,
  getRandomToFixedOne,
  Filter,
  capitalizeFirstLetter
};
