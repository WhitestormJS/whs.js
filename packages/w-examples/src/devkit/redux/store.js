import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';
import * as actions from './actions';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger),
    // other store enhancers if any
  )
);

window.actions = Object.entries(actions).map(([key, value]) => [
  key,
  (...args) => store.dispatch(value(...args))
]).reduce((obj, [key, value]) => ({
  ...obj,
  [key]: value
}), {});

export default store;
