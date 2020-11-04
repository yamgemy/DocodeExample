//Feature Driven Structure of different reducers under each feature (or shared componets)
import { combineReducers } from 'redux';
import { collapsingLayoutReducer, dummyReducer } from 'components';

export const combinedReducers = combineReducers({
  collapsingLayoutReducer,
  dummyReducer,
});
