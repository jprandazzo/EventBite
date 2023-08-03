import './App.css';
import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUpForm from './components/users/SignUpForm';
import SignInForm from './components/users/SignInForm';
import SplashPage from './components/events/SplashPage';
import SearchEvents from './components/events/SearchEvents';
import CreateEvent from './components/events/CreateEvent';
import EditEvent from './components/events/EditEvent';
import AllEvents from './components/events/AllEvents';
import ShowEvent from './components/events/ShowEvent';
import OrderIndex from './components/orders/OrderIndex';
import OrderShow from './components/orders/OrderShow';
import OrganizerEventIndex from './components/users/OrganizerEventIndex';
import LikedEvents from './components/likes/LikedEvents';

function App() {
  return (
    <>

      <Switch>
        <Route exact path="/" component={SplashPage} />
        <Route path='/all-events' component={AllEvents} />
        <Route path="/signup" component={SignUpForm} /> 
        <Route path="/signin" component={SignInForm} />
        <Route path="/organizer/events" component={OrganizerEventIndex} />
        <Route path='/events/create' component={CreateEvent} /> 
        <Route path='/events/:eventId/edit' component={EditEvent} /> 
        <Route path='/search' component={SearchEvents} />
        <Route path='/events/:eventId' component={ShowEvent} />
        <Route path='/users/:userId/favorites' component={LikedEvents}/>
        <Route path='/user/:userId' component={OrderIndex} />
        <Route path='/orders/:orderId' component={OrderShow} />
        
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