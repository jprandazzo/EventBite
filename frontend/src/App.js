import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpForm from './components/users/SignUpForm';
import SignInForm from './components/users/SignInForm';
import SplashPage from './components/events/SplashPage';
import SearchEvents from './components/events/SearchEvents';
import CreateEvent from './components/events/CreateEvent';
import AllEvents from './components/events/AllEvents';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import * as sessionActions from './store/sessionReducer';

function App() {
  const currentUser = useSelector(sessionActions.getCurrentUser);

  return (
    <>
    
      <Switch>
        <Route exact path="/"> <SplashPage currentUser={currentUser} /> </Route>
        <Route path="/signup"> <SignUpForm currentUser={currentUser}/> </Route>
        <Route path="/signin"> <SignInForm currentUser={currentUser}/> </Route>
        <Route path='/all-events'> <AllEvents currentUser={currentUser}/> </Route>
        <Route path='/events/search'> <SearchEvents currentUser={currentUser}/> </Route>
        <Route path='/events/create'> <CreateEvent currentUser={currentUser}/> </Route>
        {/* <Route path='' */}
        {/* <Route path="/signin"> <SignUpForm /> </Route> */}

        {/*<Route path="/events/new" component={EventForm} />
        <Route exact path="/events/:eventId" component={EventShow} />
        <Route path="/events/:eventId/edit" component={EventForm} /> */}
      </Switch>
    </>
  );
}

export default App;