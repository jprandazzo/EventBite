import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import NavBarLoggedOut from "../NavBar/NavBarLoggedOut";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import { useEffect } from 'react';
import * as sessionActions from '../../store/sessionReducer.js';
import * as eventActions from'../../store/eventsReducer';
import * as userActions from '../../store/usersReducer';
import './SplashPage.css';


export default function SplashPage () {
    const dispatch = useDispatch();
    const history = useHistory()
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const allEvents = useSelector(eventActions.getEvents)

    debugger;
    useEffect(() =>{
        let getData = setTimeout(() => {
            if (currentUserId) dispatch(userActions.fetchUserEvents(currentUserId));
            dispatch(eventActions.fetchEvents())
          }, 0)
        return () => clearTimeout(getData)
    }, [])

    const heartIcon = (ev) => {
        if ((currentUser && !currentUser.likedEvents.includes(ev.id)) || !currentUser) {
            return (<div className='splash-empty-heart'><svg id='fa-heart-empty' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> {/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg></div>)
        } else return (<div className='splash-filled-heart'><svg id='fa-heart-filled' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg></div>)
    }

    const heartReact = (e,ev) =>{ 
        e.stopPropagation();
        e.preventDefault();
        if (!currentUser) history.push('/signin')
        
        if (currentUser.likedEvents) {
            if (currentUser.likedEvents.includes(ev.id)) {
                const index = currentUser.likedEvents.indexOf(ev.id)
                currentUser.likedEvents.splice(index,1)
            } else currentUser.likedEvents.push(ev.id)
        }
        else currentUser['likedEvents'] = [ev.id]
          
        dispatch(userActions.updateUser(currentUser)) 
    }

    if (!allEvents) {
        return <></>
    } else return(
        <>
        <main id='splash-main'>
        {currentUser ? <NavBarLoggedIn /> : <NavBarLoggedOut previouslocation={sessionStorage.getItem('previousLocation')} />}
        <div className='splash-banner'>
            <Link to='/search'>
                <button id='event-search-button'>
                    Find your next event
                </button>
            </Link>
        </div>

        <div id='splash-events-container'>
            {/* <div id='splash-events-filter'>
                Filter - All For You etc
            </div> */}
            <div className='splash-events-topic'>
                <div className='splash-events-topic-title'>
                    <svg id='splash-ticket-svg' viewBox="0 0 24 24"><path d="M10 13v-2h4v2zm6 5V6h-.4C15 7.4 13.8 8.4 12 8.4S9 7.4 8.4 6H8v12h.4c.6-1.4 1.8-2.4 3.6-2.4s3 1 3.6 2.4zM14 4h4v16h-4s0-2.4-2-2.4-2 2.4-2 2.4H6V4h4s0 2.4 2 2.4S14 4 14 4z"></path></svg>
                    Events to <i>die</i> for
                </div>

                <div className='splash-event-tile-grid'>
                    {allEvents?.map((ev,i)=>{
                        return(
                            <div className='splash-event-tile' id={`splash-event-tile-${i}`}>
                                <div className='splash-event-tile-photo'>
                                    <Link to={`/events/${ev.id}`}>
                                        <img src={ev.imgUrl}/>
                                    </Link>
                                </div>
                                <div className='splash-event-heart-like' onClick={(e)=>heartReact(e,ev)}>{heartIcon(ev)}</div>
                                <div className='splash-event-tile-title'><Link to={`/events/${ev.id}`}>{ev.title?.toUpperCase()}</Link></div>
                                <div className='splash-event-tile-timestamp'>{moment(ev.timestampStart).format('ddd, MMM d, h:MM A')}</div>
                                <div className='splash-event-tile-location'>{ev.address}</div>
                                <div className='splash-event-tile-organizer-name'>By {ev.organizerName}</div>
                                
                            </div> 
                        )
                    })}
                </div>
            </div>
        </div>
        </main>
    </>
    )
}