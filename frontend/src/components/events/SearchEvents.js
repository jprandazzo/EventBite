import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import * as sessionActions from '../../store/sessionReducer.js';
import * as eventActions from'../../store/eventsReducer';
import * as userActions from '../../store/usersReducer';

import './SearchEvents.css'

export default function EventsSearch () {

    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const allEvents = useSelector(eventActions.getEvents)

    useEffect(() =>{
        let getData = setTimeout(() => {
            if (currentUserId) dispatch(userActions.fetchUserEvents(currentUserId));
            dispatch(eventActions.fetchEvents)
          }, 0)
        return () => clearTimeout(getData)
    }, [])

    return (
        <>
        <div className='search-page-input'>Search for Anything</div>
        <div className='search-page-location-selector'>New York</div>
        <div className='search-page-buttons'>
            <button>Today</button>
            <button>This Weekend</button>
            <button>Free</button>
            <button>Music</button>
            <button>Food & Drink</button>
        </div>
        </>
    )
}