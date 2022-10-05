import AbstractView from '../framework/view/abstract-view.js';

const RATINGS = [
  {
      min: 1,
      max: 10,
      rating: 'Novice'
  },
  {
      min: 11,
      max: 20,
      rating: 'Fan'
  },
  {
      max: +Infinity,
      min: 21,
      rating: 'Movie buff'
  },
  {
      min: 0,
      max: 0,
      rating: ''
  },
];

const createUserRatingTemplate = (moviesCount) =>{
  let currentRating = null;
  
  for (const rating of RATINGS) {
    if (moviesCount >= rating.min && moviesCount <= rating.max) {
      currentRating = rating.rating;
      break
    }
  }
  
  return `<section class="header__profile profile">
    <p class="profile__rating">${currentRating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`};

export default class UserRatingView extends AbstractView {
  #userRatingCount = null;

  constructor (userRatingCount) {
    super();
    this.#userRatingCount = userRatingCount;

  }
  
  get template () {
    return createUserRatingTemplate(this.#userRatingCount);
  }
}
