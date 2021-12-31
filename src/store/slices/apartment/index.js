import { combineReducers } from 'redux';

import { createApartment } from './create';
import { getApartment } from './get';

import createApartmentReducer from './create';
import getApartmentReducer from './get';

export { createApartment, getApartment };

export default combineReducers({
  create: createApartmentReducer,
  get: getApartmentReducer,
});
