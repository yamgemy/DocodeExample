import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combinedReducers } from './combinedReducers';


//this is to be called at App.js to be init as property of Redux Provider
export default function configureStore() {
  return createStore(
    combinedReducers,
    applyMiddleware(thunk),
  );
}
