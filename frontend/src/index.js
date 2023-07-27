import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { restoreSession } from './store/sessionReducer.js';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';
import * as sessionActions from './store/sessionReducer'
import { createUser, loginUser, logoutUser } from './store/usersReducer'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.sessionActions = sessionActions;
  window.store = store;
}

// let currentUser = sessionStorage.getItem('currentUser') ? JSON.parse(sessionStorage.getItem('currentUser')) : null;
let initialState = {};

// if (currentUser) {
//   initialState = {
//       users: {
//       [currentUser.id]: currentUser
//       }
//   };
// };

const initializeApp = () => {
  root.render(
    <React.StrictMode>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </React.StrictMode>
  );
}

if (
  sessionStorage.getItem('currentUser') === null ||
  sessionStorage.getItem('X-CSRF-Token') === null
) {
store.dispatch(sessionActions.restoreSession()).then(initializeApp)
} else {
initializeApp();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
