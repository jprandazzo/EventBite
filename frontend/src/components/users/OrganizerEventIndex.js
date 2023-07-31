import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as sessionActions from '../../store/sessionReducer'
import * as userActions from '../../store/usersReducer'
import * as eventActions from '../../store/eventsReducer'
import "./OrganizerEventIndex.css"

export default function OrganizerEventIndex () {
    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const organizerEventIds = currentUser ?.organizedEvents
    const allEvents = Array.from(useSelector(eventActions.getEvents))
    const currentUserOrganizedEvents = organizerEventIds ? allEvents.filter(el => organizerEventIds.includes(el.id)) : null
    useEffect(() =>{
        let getData = setTimeout(() => {
            dispatch(userActions.fetchUserEvents(currentUserId));
          }, 0)
        return () => clearTimeout(getData)
    }, [])

    const handleDeleteEvent = (eventId) =>{
        return dispatch(eventActions.deleteEvent(eventId))
    }

    return(
        <>
        <NavBarLoggedIn />
        <br/><br/>
        <h1 className='organizer-index'>Events</h1>
        <ul className='organizer-index-ul'>
            {currentUserOrganizedEvents?.map(event => 
            <><li>{event.title}</li>
            <li>{event.timestampStart}</li>
            <li>{event.venueName}</li>
            <li>Sold: {event.ticketsSold}/{event.capacity}</li>
            <li>Gross: ${event.ticketsSold * event.price}</li>
            <Link to={`/events/${event.id}/edit`}>Edit</Link>
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </>
            )}
        </ul>
        </>
    )
}