import './App.css';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import SignUpForm from './components/users/SignUpForm';
import SignInForm from './components/users/SignInForm';

function App() {
  return (
    <>
    <h1>Vampires!</h1>
    {/* <a href='/signup'>Sign Up</a> */}
    
    <Switch>
      <Route path="/signup"> <SignUpForm /> </Route>
      <Route path="/signin"> <SignInForm /> </Route>
      {/* <Route path="/signin"> <SignUpForm /> </Route> */}

      {/* <Route exact path="/" component={EventIndex} />
      <Route path="/events/new" component={EventForm} />
      <Route exact path="/events/:eventId" component={EventShow} />
      <Route path="/events/:eventId/edit" component={EventForm} /> */}
    </Switch>
    </>
  );
}

export default App;