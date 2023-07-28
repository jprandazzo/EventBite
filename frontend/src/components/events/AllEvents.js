import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom/";
import * as eventActions from '../../store/eventsReducer'
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import './AllEvents.css'

export default function AllEvents () {
    const dispatch = useDispatch();
    
    useEffect(() =>{
        dispatch(eventActions.fetchEvents())
    }, [])

    const allEvents = useSelector(eventActions.getEvents)
    return (
        <>
            <NavBarLoggedIn></NavBarLoggedIn>
            <br/><br/>
            <ul className='events-index'>
            {allEvents.map(event => {
                return (<>
                    <Link to={`events/${event.id}`}><b>{event.title}:</b></Link>
                    <li>Organizer: {event.organizerName}</li>
                    <li>Location: {event.venueName}</li>
                    <li>Date/Time: {event.timestampStart} - {event.timestampEnd}</li>
                    <li>Type: {event.eventType}</li>
                    <li>Category: {event.eventCategory}</li>
                    <li>{event.capacity - event.ticketsSold} tickets remaining</li>
                    <li>Price: {event.price}</li>
                    <li>Description: {event.description}</li>
                </>)
            })}
            </ul>
        </>
    )
}