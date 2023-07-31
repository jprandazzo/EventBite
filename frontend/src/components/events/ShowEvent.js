import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import * as eventActions from '../../store/eventsReducer'
import * as sessionActions from '../../store/sessionReducer'
import * as orderActions from '../../store/ordersReducer'
import * as userActions from '../../store/usersReducer'
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import NavBarLoggedOut from '../NavBar/NavBarLoggedOut';
import './ShowEvent.css'
import NotFoundErrorPage from "../errorPages/NotFoundErrorPage";

export default function ShowEvent () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {eventId} = useParams();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))

    const [doneLoading, setDoneLoading] = useState(false);
    const [event, setEvent] = useState(undefined)
    const [numTickets, setNumTickets] = useState(0)
    
    useEffect(() =>{
        const awaitFetchBeforeLoading = async () => {
            const res = await dispatch(eventActions.fetchEvent(eventId))
            if (currentUserId) dispatch(userActions.fetchUserEvents(currentUserId));
            setEvent(res[0])
            setDoneLoading(res[1])
        }
        awaitFetchBeforeLoading()
    }, [])

    // const handleTicketDecreaseStyling = () => {
    //     el = document.querySelector('.ticket-count-decrease')

    //     if (numTickets) {
    //         el.classList.add('clickable-ticket-button')
    //         el.addEventListener('click', setNumTickets(numTickets-1))
    //     } else {
    //         if (el.classList.includes('clickable-ticket-button')) {
    //             el.classList.remove('clickable-ticket-button')};
    //         el.removeEventListener('click');
    //     }
    // }

    const handlePurchase = (eventId) => {

        if (!currentUser) {
            history.push('/signin')
        } else {
            const order = {
                numTickets,
                ticketholderId: currentUser.id,
                eventId
            }

            return dispatch(orderActions.createOrder(order))
            .then(history.push(`/user/${currentUser.id}`));
        }
    }

    useEffect(() =>{
        if (numTickets) {
            document.querySelector('.ticket-count-decrease').addEventListener('click', handlePlusMinusClick)
        }
    }, [numTickets])

    const handlePlusMinusClick = (e) =>{
        if (e.target.innerHTML === '+') {
            setNumTickets(numTickets+1)
        } else {
            setNumTickets(numTickets-1)
        }
    }
    
    if (!doneLoading) {
        return <></>
    } else {
        if (event) {
            return (
                <>
                    {currentUser ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
                    {/* <svg width='1676' height='430' viewBox='0 0 1676 430' fill='none' xmlns='http://www.w3.org/2000/svg'><g clip-path='url(#clip0_3405_50198)'><path d='M1669.31 -124.702C1704.63 -198.281 1599.75 -278.89 1440.21 -219.509C1280.67 -160.128 1138.67 -174.472 940.588 -234.668C588.163 -341.792 438.492 -309.897 215.804 -220.763C150.423 -195.199 15.9418 -122.33 0.814447 -35.3897C-18.0424 73.26 298.334 62.7189 143.288 203.358C-11.7568 343.996 26.7216 552.457 835.628 313.658C939.215 283.079 1109.58 269.122 1259.68 366.729C1409.78 464.336 1549.16 434.834 1602.55 362.937C1716.96 208.836 1609.92 -1.08292 1669.31 -124.702Z' fill='#EDF1FC'/></g><defs><clipPath id='clip0_3405_50198'><rect width='1676' height='430' fill='white'/></clipPath></defs></svg> */}
                    <ul className='show-event-page'>
                        <b>{event.title}:</b>
                            <li>Organizer: {event.organizerName}</li>
                            <li>Location: {event.venueName}</li>
                            <li>Date/Time: {event.timestampStart} - {event.timestampEnd}</li>
                            <li>Type: {event.eventType}</li>
                            <li>Category: {event.eventCategory}</li>
                            <li>{event.capacity - event.ticketsSold} tickets remaining</li>
                            <li>{event.price ? event.price : 'Free'}</li>
                            <li>Description: {event.description}</li>
                    </ul>
                    <div className='ticket-purchase-container'>
                        <button className='ticket-count-decrease'>-</button>
                        <div className='ticket-count-text'>{numTickets}</div>
                        <button className='ticket-count-increase' onClick={e=>{handlePlusMinusClick(e)}}>+</button>
                        <button onClick={() =>handlePurchase(event.id)}>Get tickets</button>
                    </div>
    
                </>
            )
        } else return <NotFoundErrorPage />
    }

    
    
}