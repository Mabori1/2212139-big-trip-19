import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import NewEventButtonView from './view/new-event-btn-view.js';
import { render } from './framework/render.js';
import FilterView from './view/trip-filter.js';
import SortView from './view/trip-sort.js';
import { generateFilter } from './mosk/filter.js';
import { generateSortOptions } from './mosk/sort.js';


const headerElement = document.querySelector('.trip-controls');
const tripEventsElement = document.querySelector('.trip-events');
const newEventsButtonContainerElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const destinationModel = new DestinationsModel();
const offersModel = new OffersModel();

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, destinationModel, offersModel);

const points = pointsModel.points;
const filters = generateFilter(points);
const sortOptions = generateSortOptions(points);

render(new FilterView(filters), headerElement);
render(new SortView(sortOptions), tripEventsElement);
render(new NewEventButtonView(), newEventsButtonContainerElement);


tripPresenter.init();
