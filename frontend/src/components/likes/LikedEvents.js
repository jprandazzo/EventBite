import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import moment from 'moment-timezone';
import * as eventActions from '../../store/eventsReducer'
import * as sessionActions from '../../store/sessionReducer'
import * as orderActions from '../../store/ordersReducer'
import * as userActions from '../../store/usersReducer'
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import NavBarLoggedOut from '../NavBar/NavBarLoggedOut';
import './LikedEvents.css'
import NotFoundErrorPage from "../errorPages/NotFoundErrorPage";

export default function LikedEvents () {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))

    const [doneLoading, setDoneLoading] = useState(false);
    const [events, setEvents] = useState(undefined)
    const allEvents = Array.from(useSelector(eventActions.getEvents))
    const userLikedEvents = (currentUser && allEvents) ? allEvents.filter(ev => currentUser.likedEvents.includes(ev.id)) : []

    useEffect(() =>{
        const awaitFetchBeforeLoading = async () => {
            const res = await dispatch(eventActions.fetchEvents())
            if (currentUserId) dispatch(userActions.fetchUserEvents(currentUserId));
            setEvents(res[0])
            setDoneLoading(res[1])
        }
        awaitFetchBeforeLoading()
    }, [])

    const heartIcon = (e) => {
        if (!currentUser.likedEvents.includes(e.id)) {
            return (<div className='liked-events-empty-heart'><svg id='fa-heart-empty' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> {/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg></div>)
        } else return (<div className='liked-events-filled-heart'><svg id='fa-heart-filled' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg></div>)
    }

    const heartReact = (e,ev) =>{ 
        e.stopPropagation()
        currentUser['currentPageId'] = ev.id
          
        dispatch(userActions.updateUser(currentUser)) 
    }

    if (!doneLoading || !currentUser || !allEvents) {
        return <></>
    } else {
        if (allEvents) {return(
            <>
            {currentUser ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
            <main className='likes-main'>
                <div className='likes-title'>
                    Likes
                </div>

                <div className='events-container'>
                    {userLikedEvents?.map((ev,i)=>{
                        return(
                            <div className='liked-event-tile' id={`liked-event-tile-${i}`}>
                                <div className='liked-event-tile-title liked-event-tile-left'><Link to={`/events/${ev.id}`}>{ev.title.toUpperCase()}</Link></div>
                                <div className='liked-event-tile-timestanp liked-event-tile-left'>{moment(ev.timestampStart).format('ddd, MMM d, h:MM A')}</div>
                                <div className='liked-event-tile-location liked-event-tile-left'>{ev.address}</div>
                                <div className='liked-event-tile-photo liked-event-tile-right'>photo-placeholder</div>
                                <div className='liked-event-heart-like liked-event-tile-right' onClick={(e)=>heartReact(e,ev)}>{heartIcon(ev)}</div>
                            </div> 
                        )
                        
                    })}
                </div>
            </main>
            </>
        )
    } else return <NotFoundErrorPage />
}
}