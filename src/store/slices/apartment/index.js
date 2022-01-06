import { combineReducers } from 'redux';

import { createApartment } from './create';
import { getApartment } from './get';

import createApartmentReducer from './create';
import getApartmentReducer from './get';
import deleteApartment from './delete';

export { createApartment, getApartment };

export default combineReducers({
  create: createApartmentReducer,
  get: getApartmentReducer,
  delete: deleteApartment
});
