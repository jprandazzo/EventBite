import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import moment from 'moment-timezone';
import { useEffect } from "react";

import NavBarLoggedIn from '../NavBar/NavBarLoggedIn';
import * as sessionActions from '../../store/sessionReducer';
import * as userActions from '../../store/usersReducer';
import * as eventActions from '../../store/eventsReducer';
import * as orderActions from '../../store/ordersReducer';
import * as searchActions from '../../store/searchReducer';
import './OrderIndex.css'

export default function OrderIndex () {
    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getCurrentUser).id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const orders = useSelector(orderActions.getOrders).sort((a,b) => b.id - a.id)
    const events = useSelector(eventActions.getEvents)

    useEffect(() =>{
        let getData = setTimeout(() => {
            dispatch(userActions.fetchUserEvents(currentUserId));
          }, 0)
        return () => clearTimeout(getData)
    }, [])

    const pluralizeOrders = () =>{
        if (currentUser && currentUser.orders.length === 1) {
            return 'order'
        } else return 'orders'
    }

    const focusInput = (e) => {
        //whichever div is clicked, find its input and focus it

        if (e.target.className === 'organizer-index-search-box' || e.target.className === 'organizer-index-search-create') {
            let input = e.target.querySelector('.organizer-index-search-input')
            input.focus()
        } else if (e.target.className === 'organizer-index-search-input') {
            e.target.focus()
        }
    }

    function setClosestDivsActive(e){
            let outerDiv = e.target.closest('div')
            outerDiv.classList.add('active-div')
    }

    function setClosestDivsInactive(e) {
        //remove 'focus' class from both surrounding divs of the input
        //that was blurred
        let outerDiv = e.target.closest('div')
        outerDiv.classList.remove('active-div')
    }

    const toggleHide = e => {
        debugger
        if (['svg', 'path'].includes(e.target.nodeName.toLowerCase())) {
            debugger
            let closest = e.target.closest('div')
            closest.querySelector('.edit-delete-dropdown-content').classList.toggle('hidden')
        }
    }

    const handleDeleteOrder = (orderId) =>{
        return dispatch(orderActions.deleteOrder(orderId))
    }

    if (currentUser) {return (
        <>
            <NavBarLoggedIn />
            <main className='order-index-main'>
                
                <div className='show-user-name-tile'>
                    <p>Pic placeholder</p>
                    <h1 className='show-user-name-tile-name'>{`${currentUser?.firstName} ${currentUser.lastName}`}</h1>
                    <p>{currentUser?.orders.length} {pluralizeOrders()}</p>
                </div>
                <div className='order-index-orders'>
                    <h2>Orders</h2>
                    {orders.map((order, i) =>{
                        const event = events.filter(event => event.id === order.eventId)[0]
                        return(
                            <>
                            {/* <Link to={`/events/${ev.id}`} className='search-event-tile-link' target='_blank'>
                                <div className='search-event-tile' id={`search-event-tile-${i}`}>
                                    <div className='search-event-tile-photo'>photo-placeholder</div>
                                    <div className='search-event-heart-like' onClick={(e)=>heartReact(e,ev)}>{heartIcon(ev)}</div>
                                    <div className='search-event-tile-title'>{ev.title}</div>
                                    <div className='search-event-tile-timestanp'>{moment(ev.timestampStart).format('ddd, MMM d · h:MM A')}</div>
                                    <div className='search-event-tile-location'>{ev.address}</div>
                                    <div className='search-event-tile-price'>{ev.price ? `$${Number(ev.price).toFixed(2)}` : 'Free'}</div>
                                </div> 
                            </Link> */}
                                <p>order #{order.id}</p>
                                <p>ordered on {order.createdAt}</p>
                                <p>{event.title}</p>
                                <p>{event.date}</p>
                                <p>{`$${event.price * order.numTickets}` || 'Free order'}</p>
                            </>

                            
                        )
                    })}
                </div>
            </main>
        </>
    )}
}