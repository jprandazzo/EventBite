import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import NavBarLoggedIn from '../NavBar/NavBarLoggedIn';
import * as sessionActions from '../../store/sessionReducer';
import * as userActions from '../../store/usersReducer';
import * as eventActions from '../../store/eventsReducer';
import * as orderActions from '../../store/ordersReducer';
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
                    {orders.map(order =>{
                        const event = events.filter(event => event.id === order.eventId)[0]
                        return(
                            <>
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