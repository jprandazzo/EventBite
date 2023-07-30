import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpForm from './components/users/SignUpForm';
import SignInForm from './components/users/SignInForm';
import SplashPage from './components/events/SplashPage';
import SearchEvents from './components/events/SearchEvents';
import CreateEvent from './components/events/CreateEvent';
import EditEvent from './components/events/EditEvent';
import AllEvents from './components/events/AllEvents';
import ShowEvent from './components/events/ShowEvent';
import OrganizerEventIndex from './components/users/OrganizerEventIndex';
import * as sessionActions from './store/sessionReducer';

function App() {
  return (
    <>
    
      <Switch>
        <Route exact path="/"> <SplashPage /> </Route>
        <Route path='/all-events'> <AllEvents /> </Route>
        <Route path="/signup"> <SignUpForm /> </Route>
        <Route path="/signin"> <SignInForm /> </Route>
        <Route path="/organizer/events"> <OrganizerEventIndex /> </Route>
        <Route path='/events/create'> <CreateEvent /> </Route>
        <Route path='/events/:eventId/edit'> <EditEvent /> </Route>
        <Route path='/events/search'> <SearchEvents /> </Route>
        <Route path='/events/:eventId'><ShowEvent /></Route>
        
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