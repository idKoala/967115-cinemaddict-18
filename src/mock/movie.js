import {getRandomInteger, gerRandomArrayElement, getRandomSubArray} from '../utils.js';

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

export const generateMovie = () => ({
  'id': 0,
  'comments': [
    '001', '002'
  ],
  'film_info': {
    'title': gerRandomArrayElement(MOVIES_TITLES),
    'alternative_title': 'Laziness Who Sold Themselves',
    'total_rating': 3.5,
    'poster': gerRandomArrayElement(MOVIES_POSTERS),
    'age_rating': 0,
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
      'Comedy'
    ],
    'description': getRandomSubArray(MOVIES_DESCRIPTION).join(' '),
  },
  'user_details': {
    'wishlist': false,
    'already_watched': true,
    'watching_date': '2019-04-12T16:12:32.554Z',
    'favorite': false
  }
});
