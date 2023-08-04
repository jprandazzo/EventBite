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

    const toggleHide = e => {
        document.querySelectorAll('order-tile-dropdown-delete-button').forEach(button=>button.classList.add('hidden'));
        if (e.target.classList.contains('trigger-toggle')) {
            let oid = Array.from(e.target.classList)[2]?.slice(6)
            document.querySelector(`#delete-button-${oid}`)?.classList.toggle('hidden')
        }
    }

    if (currentUser) {return (
        <>
            <NavBarLoggedIn />
            <main id='order-index-main'>
            <section id='order-index-centered' onClick={(e)=>toggleHide(e)}>
                <div id='order-index-name-tile'>
                    <div id='order-index-user-photo'>
                    <svg id="order-index-user-svg" x="0" y="0" viewBox="0 0 24 24"><path id="user_svg__eds-icon--user_base" fillRule="evenodd" clipRule="evenodd" d="M5.2 19.1c1-2.8 3.7-4.7 6.7-4.7s5.7 1.9 6.7 4.7c-4.1 2.5-9.3 2.5-13.4 0zm16.1-1.9c-.5.5-1.1 1-1.7 1.5a8.15 8.15 0 00-7.6-5.2c-3.3 0-6.3 2.1-7.6 5.1-.6-.4-1.1-.9-1.6-1.4l-.8.7C4.8 20.6 8.4 22 12 22s7.2-1.4 10-4.1l-.7-.7z"></path><path id="user_svg__eds-icon--user_head" fillRule="evenodd" clipRule="evenodd" d="M12 2C9.2 2 7 4.2 7 7s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 9c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path></svg>
                    </div>
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
                    <div className='order-index-event-tile'>
                        <Link to={`/events/${event.id}`} className='order-index-tile-photo-link' target='_blank'><div className='order-index-tile-photo'>photo-placeholder</div></Link>
                        <div className='order-tile-date-small'>
                            <div className='order-tile-date-month'>{moment(event.timestampStart).format('MMM')}</div>
                            <div className='order-tile-date-day'>{moment(event.timestampStart).format('D')}</div>
                        </div>
                        <Link to={`/events/${event.id}`} className='order-index-tile-link' target='_blank'><div className='order-index-tile-title'>{event.title}</div></Link>
                        <div className='order-tile-timestamp'>{moment(event.timestampStart).format('ddd, MMM d, h:MM A')}</div>
                        <div className='order-tile-order-price-date'>{`$${(event.price * order.numTickets).toFixed(2)} order` || 'Free order'} {`#${order.id}`} placed on {moment(order.createdAt).format('ddd, MMM DD, h:MM A')}</div>
                        <div className={`order-tile-edit-dropdown-dots trigger-toggle order-${order.id}`}>
                            <svg className={`order-tile-vertical-dots-chunky-svg trigger-toggle order-${order.id}`} x="0" y="0" viewBox="0 0 24 24"><path className={`trigger-toggle order-${order.id}`} id="vertical-dots-chunky_svg__eds-icon--vertical-dots-chunky_dot_2" fillRule="evenodd" clipRule="evenodd" d="M10 18c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"></path><circle className={`trigger-toggle order-${order.id}`} id="vertical-dots-chunky_svg__eds-icon--vertical-dots-chunky_dot" fillRule="evenodd" clipRule="evenodd" cx="12" cy="12" r="2"></circle><circle className={`trigger-toggle order-${order.id}`} id="vertical-dots-chunky_svg__eds-icon--vertical-dots-chunky_dot_1" fillRule="evenodd" clipRule="evenodd" cx="12" cy="6" r="2"></circle></svg>
                        </div>
                        <div className={`order-tile-dropdown-delete-button hidden`} id={`delete-button-${order.id}`} onClick={()=>dispatch(orderActions.deleteOrder(order.id))}>
                            Delete order
                            <div className='delete-are-you-sure'>Are you sure??</div>
                        </div>
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