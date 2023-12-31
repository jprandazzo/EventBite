import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './usersReducer';
import sessionReducer from './sessionReducer';
import eventsReducer from './eventsReducer';
import ordersReducer from './ordersReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  session: sessionReducer,
  events: eventsReducer,
  orders: ordersReducer,
  search: searchReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}



export default function configureStore (preloadedState = {}) {
    return createStore(rootReducer, preloadedState, enhancer)
}