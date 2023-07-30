import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { useHistory, useParams, Link } from 'react-router-dom';
import NavBarLoggedIn from '../NavBar/NavBarLoggedIn';
import * as sessionActions from '../../store/sessionReducer';
import * as userActions from '../../store/usersReducer';
import * as eventActions from '../../store/eventsReducer';
import * as orderActions from '../../store/ordersReducer';
import './OrderShow.css'

export default function OrderShow () {
    const dispatch = useDispatch();
    const {orderId} = useParams();
    const currentUserId = useSelector(sessionActions.getCurrentUser).id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const order = useSelector(orderActions.getOrder(orderId))
    const event = useSelector(eventActions.getEvent(order?.eventId))
    useEffect(() =>{
        let getData = setTimeout(() => {
            dispatch(userActions.fetchUserEvents(currentUserId));
          }, 0)
        return () => clearTimeout(getData)
    }, [])

    return(
    <>
        <NavBarLoggedIn /><br/><br/>
        <div className='order-show-go-back'>
            <Link to={`/users/${currentUserId}`}>Back to Current Orders</Link>
        </div>
        <div className='order-show-title-box'>
            <h1 className='order-show-title'>Order for <Link to={`/events/${event?.id}`}>{event?.title}</Link></h1>
            <p className='order-show-info'>
                {event?.price ? `$${order.numTickets * event.price}` : `Free`} order #{order?.id} on {order?.createdAt}<br/>
                <b>Event Information:</b>: from {event?.timestampStart} to {event?.timestampEnd}<br/>
                {event?.address}
            </p>
        </div>
        <div className='order-show-lower-box'>
            <button>Cancel Order</button>
            <div className='order-show-ticket-info'>
                <h2 className='order-show-ticket-count'>({order?.numTickets}x) General Admission</h2><br/>
                <h3>Contact Information</h3><br/>
                <h4>First Name</h4><br/>
                {currentUser?.firstName}<br/>
                <h4>Last Name</h4><br/>
                {currentUser?.lastName}<br/>
                <h4>Email</h4><br/>
                {currentUser?.email}
            </div>
        </div>
        <div className='order-show-go-back'>
            <Link to={`/users/${currentUserId}`}>Back to Current Orders</Link>
        </div>
    </>
    )
}