import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpForm from './components/users/SignUpForm';
import SignInForm from './components/users/SignInForm';
import SplashPage from './components/events/SplashPage';

function App() {
  
  return (
    <>
    
    {/* <Switch> */}
      <Route exact path="/"> <SplashPage /> </Route>
      <Route path="/signup"> <SignUpForm /> </Route>
      <Route path="/signin"> <SignInForm /> </Route>
      {/* <Route path='' */}
      {/* <Route path="/signin"> <SignUpForm /> </Route> */}

      {/*<Route path="/events/new" component={EventForm} />
      <Route exact path="/events/:eventId" component={EventShow} />
      <Route path="/events/:eventId/edit" component={EventForm} /> */}
    {/* </Switch> */}
    </>
  );
}

export default App;