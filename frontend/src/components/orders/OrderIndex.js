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

    const pluralizeOrders = (orders) =>{
        if (currentUser && orders.length === 1) {
            return '1 order'
        } else return `${orders.length} orders`
    }

    const pluralizeLikes = (likes) =>{
        if (currentUser && likes.length === 1) {
            return '1 like'
        } else return `${likes.length} like`
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
            <main id='order-index-main'>
            <section id='order-index-centered'>
                <div id='order-index-name-tile'>
                    <div id='order-index-user-photo'>Pic</div>
                    <div id='order-index-name-tile-name'>{`${currentUser?.firstName} ${currentUser.lastName}`}</div>
                    <div className='order-index-orders-likes' id='order-index-orders-count'>{currentUser ? pluralizeOrders(currentUser.orders) : ''}</div>
                    <div id='order-index-likes-dot'>·</div>
                    <div className='order-index-orders-likes' id='order-index-likes-count'>{currentUser ? pluralizeLikes(currentUser.likedEvents) : ''}</div>
                </div>

                <div id='order-index-container'>
                    <div id='orders-title-box'>Orders</div>
                    {orders.map((order, i) =>{
                        const event = events.filter(event => event.id === order.eventId)[0]
                        return(
                            <>
                            {/* 
                                <div className='search-event-tile' id={`search-event-tile-${i}`}>
                                    
                                    
                                    
                                    
                                    <div className='search-event-tile-location'>{ev.address}</div>
                                    <div className='search-event-tile-price'>{ev.price ? `$${Number(ev.price).toFixed(2)}` : 'Free'}</div>
                                </div>  */}
                    <div className='order-index-event-tile'>
                        <Link to={`/orders/${order.id}`} className='order-index-tile-photo' target='_blank'><div className='order-index-tile-photo'>photo-placeholder</div></Link>
                        <div className='order-tile-date-small'>
                            <div className='order-tile-date-month'>{moment(event.timestampStart).format('MMM')}</div>
                            <div className='order-tile-date-day'>{moment(event.timestampStart).format('D')}</div>
                        </div>
                        <Link to={`/events/${event.id}`} className='order-index-tile-link' target='_blank'><div className='order-index-tile-title'>{event.title}</div></Link>
                        <div className='order-tile-timestamp'>{moment(event.timestampStart).format('ddd, MMM d, h:MM A')}</div>
                        <div className='order-tile-order-price-date'>{`$${(event.price * order.numTickets).toFixed(2)} order` || 'Free order'} {`${order.id}`} placed on {moment(order.createdAt).format('ddd, MMM DD, h:MM A')}</div>
                        <p></p>
                    </div>
                            </>

                            
                        )
                    })}
                </div>
            </section>
            </main>
        </>
    )}
}