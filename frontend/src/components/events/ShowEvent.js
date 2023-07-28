import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as eventActions from '../../store/eventsReducer'
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import './ShowEvent.css'
import NotFoundErrorPage from "../errorPages/NotFoundErrorPage";

export default function ShowEvent () {
    const dispatch = useDispatch();
    const {eventId} = useParams();
    
    useEffect(() =>{
        setPageLoad(true)
        dispatch(eventActions.fetchEvent(eventId));
    }, [])
    const [pageLoad, setPageLoad] = useState(false)
    const event = useSelector(eventActions.getEvent(eventId))

    
    if (!pageLoad) {
        return <h1 className='show-event-page'>Loading</h1>
    }

    
    if (!event) {
        return <NotFoundErrorPage />
    }
    
    
    return (
        <>
            <NavBarLoggedIn />
            {/* <svg width='1676' height='430' viewBox='0 0 1676 430' fill='none' xmlns='http://www.w3.org/2000/svg'><g clip-path='url(#clip0_3405_50198)'><path d='M1669.31 -124.702C1704.63 -198.281 1599.75 -278.89 1440.21 -219.509C1280.67 -160.128 1138.67 -174.472 940.588 -234.668C588.163 -341.792 438.492 -309.897 215.804 -220.763C150.423 -195.199 15.9418 -122.33 0.814447 -35.3897C-18.0424 73.26 298.334 62.7189 143.288 203.358C-11.7568 343.996 26.7216 552.457 835.628 313.658C939.215 283.079 1109.58 269.122 1259.68 366.729C1409.78 464.336 1549.16 434.834 1602.55 362.937C1716.96 208.836 1609.92 -1.08292 1669.31 -124.702Z' fill='#EDF1FC'/></g><defs><clipPath id='clip0_3405_50198'><rect width='1676' height='430' fill='white'/></clipPath></defs></svg> */}
            <ul className='show-event-page'>
                <b>{event.title}:</b>
                    <li>Organizer: {event.organizerName}</li>
                    <li>Location: {event.venueName}</li>
                    <li>Date/Time: {event.timestampStart} - {event.timestampEnd}</li>
                    <li>Type: {event.eventType}</li>
                    <li>Category: {event.eventCategory}</li>
                    <li>{event.capacity - event.ticketsSold} tickets remaining</li>
                    <li>Price: {event.price}</li>
                    <li>Description: {event.description}</li>
            </ul>

        </>
    )
}