import {getRandomInteger, gerRandomArrayElement, getRandomSubArray} from '../utils.js';
import {TOTAL_COMMENTS} from './comment.js';

const TOTAL_MOVIES = 5;
const COMMENTS_INDEX_ARRAY = Array.from({length: TOTAL_COMMENTS}, (_value, index) => index + 1);

const MOVIES_TITLES = [
  'Аватар', 'Игры разума', 'Константин'
];

const MOVIES_POSTERS = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg'
];

const MOVIES_DESCRIPTION = [
  'Угораздило же влюбиться не в том месте и не в то время.',
  'Здесь хамят в ресторанах, о горячей воде слагают легенды, да и с транспортом полный коллапс.',
  'Но у таинственной незнакомки отменная фигура, да и стреляет она без промаха.',
  'Кто же по своей воле откажется от такой красотки?',
  'Великовозрастный оболтус дружит с говорящим плюшевым медведем.'
];

const generateMovie = () => ({
  'film_info': {
    'title': gerRandomArrayElement(MOVIES_TITLES),
    'alternative_title': 'Laziness Who Sold Themselves',
    'totalRating': 3.5,
    'poster': gerRandomArrayElement(MOVIES_POSTERS),
    'ageRating': 0,
    'director': 'Tom Ford',
    'writers': [
      'Takeshi Kitano'
    ],
    'actors': [
      'Morgan Freeman'
    ],
    'release': {
      'date': '2019-05-11T00:00:00.000Z',
      'release_country': 'Finland'
    },
    'runtime': 77,
    'genre': [
      'Comedy',
      'Drama'
    ],
    'description': getRandomSubArray(MOVIES_DESCRIPTION).join(' '),
  },
  'user_details': {
    'wishlist': false,
    'alreadyWatched': true,
    'watching_date': '2019-04-12T16:12:32.554Z',
    'favorite': true
  }
});

export const generateMovies = () => Array.from({length: TOTAL_MOVIES}, (_value, index) => {
  const commentsFilmCount = getRandomInteger(1, COMMENTS_INDEX_ARRAY.length);
  const commentsFilmArray = [];
  for (let i = 0; i < commentsFilmCount; i++) {
    const spliceElement = COMMENTS_INDEX_ARRAY.splice(getRandomInteger(0, COMMENTS_INDEX_ARRAY.length - 1), 1);
    if (spliceElement !== undefined) {

      commentsFilmArray.push(spliceElement[0]);
    } else {break;}

  }
  return {
    id: index + 1,
    comments: commentsFilmArray,
    ...generateMovie()
  };
});
