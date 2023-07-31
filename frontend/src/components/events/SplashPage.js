import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import NavBarLoggedOut from "../NavBar/NavBarLoggedOut";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import * as sessionActions from '../../store/sessionReducer.js';
import * as eventActions from'../../store/eventsReducer';
import * as userActions from '../../store/usersReducer';
import './SplashPage.css';


export default function SplashPage () {
    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const allEvents = useSelector(eventActions.getEvents)

    useEffect(() =>{
        let getData = setTimeout(() => {
            if (currentUserId) dispatch(userActions.fetchUserEvents(currentUserId));
            dispatch(eventActions.fetchEvents())
          }, 0)
        return () => clearTimeout(getData)
    }, [])

    return(
        <>
            <main id='splash-main'>
            {currentUser ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
            <br />
            <br />
            <div className='splash-banner'>
                <Link to='/search'>
                    <button>
                        Find your next event
                    </button>
                </Link>
            </div>
            <h2>Events:</h2>
            {allEvents.map(event =>{
                return(<>
                    <p>{event.title}<br/>
                    {event.timestampStart}<br/>
                    {event.organizerName}<br/>
                    </p><br/><br/>
                </>)
            })}
            </main>
        </>
    )
}