import { createElement } from '../render.js';
import { formatDate, humanizeDate, formatTime, durationDate } from '../utils';
import { createOffersTemplate } from './template/offers-template.js';


function createPointTemplate(point, destination, offers) {
  const { basePrice, dateFrom, dateTo, type, isFavorite } = point;

  if (!destination) {
    return '';
  }
  const { name } = destination;

  return `
  <div class="event">
    <time class="event__date" datetime=${formatDate(dateFrom)}>${humanizeDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime=${formatDate(dateFrom)}T${formatTime(dateFrom)}>${formatTime(dateFrom)}</time>
        &mdash;
        <time class="event__end-time" datetime=${formatDate(dateTo)}T${formatTime(dateTo)}>${formatTime(dateTo)}</time>
      </p>
      <p class="event__duration">${durationDate(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
                ${createOffersTemplate(offers)}
            </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
}

export default class PointView {

  constructor(point, destination, offers) {
    this.point = point;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.destination, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
