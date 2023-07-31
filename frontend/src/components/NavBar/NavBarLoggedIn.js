import { useDispatch, useSelector } from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import * as sessionActions from '../../store/sessionReducer.js';
import * as eventActions from'../../store/eventsReducer';
import * as userActions from '../../store/usersReducer';
import './NavBarLoggedIn.css';

export default function NavBarLoggedIn () {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    debugger
    // **LOOK AT HISTORY.LOCATION**

    // const toggleDropdown = (e) => {
    //     let el = e.target.closest('span')
    //     let dropdown = el.childNodes[2]
    //     dropdown.classList.toggle('hidden')
    // }

    // const showDropdown = (e) => {
    //     let el = e.target.closest('span')
    //     let dropdown = el.childNodes[2]

    //     dropdown.classList.remove('hidden')
    // }    

    // const hideDropdown = (e) => {
    //     let el = e.target.closest('span')
    //     let dropdown = el.childNodes[2]

    //     dropdown.classList.add('hidden')
    // }

    const logout = (e) => {
        e.preventDefault();

        return (dispatch(sessionActions.logout()))
            // .catch(async (res) => {
            //     let data;
            //     try {
            //         data = await res.clone().json();
            //     } catch {
            //         data = await res.text();
            //     }
            //     if (data?.errors) setErrors(data.errors);
            //     else if (data) setErrors([data]);
            //     else setErrors([res.statusText]);
            // });
            .then(history.push('/signin'))
        
    }

    return (
        <>
        <nav id='main-navigation'>
            <ul className='navbar'>
                <li className='nav-left'> 
                    <span id='eblogo-nav'>
                        <Link to='/'>
                            <img src='https://cdn.evbstatic.com/s3-build/prod/1322331-rc2023-07-24_16.04-5e36c7c/django/images/logos/eb_orange_on_white_1200x630.png' alt='app logo' />
                        </Link>
                    </span>
                </li>

                <li className='nav-left'> 
                    <span id='search-events'>
                        <Link to='/search'>
                            <svg id="magnifying-glass" x="0" y="0" viewBox="0 0 24 24"><path id="magnifying-glass-chunky_svg__eds-icon--magnifying-glass-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M10 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm3.5.9c-1 .7-2.2 1.1-3.5 1.1-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 1.3-.4 2.5-1.1 3.4l5.1 5.1-1.5 1.5-5-5.1z"></path></svg>
                            Search events
                        </Link> 
                    </span>
                </li>

                <li className='nav-right user-dropdown'>
                    <span className='dropdown' id='user-dropdown' /*onClick={e =>toggleDropdown(e)} onMouseOver={e => showDropdown(e)} onBlur={e =>hideDropdown(e)} */ >
                        {currentUser?.email}
                        <svg id="chevron-down" x="0" y="0" viewBox="0 0 24 24"><path id="chevron-down-chunky_svg__eds-icon--chevron-down-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M7 10.2l5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6z"></path></svg>
                        <div className='dropdown-content hidden' id='user-dropdown-content'>
                            <ul>
                                <li>Browse Events</li>
                                <li>Manage my Events</li>
                                <li><Link to={`/user/${currentUserId}`}>Tickets ({currentUser?.attendingEvents.length})</Link></li>
                                <li>Liked</li>
                                <li>Following</li>
                                <li onClick={logout}>Logout</li>
                            </ul>
                        </div>
                    </span>
                </li>

                <li className='nav-right'> 
                    <span>
                        <Link to={`/users/${currentUser?.id}`}>
                            <svg id='ticket' viewBox="0 0 24 24"><path d="M10 13v-2h4v2zm6 5V6h-.4C15 7.4 13.8 8.4 12 8.4S9 7.4 8.4 6H8v12h.4c.6-1.4 1.8-2.4 3.6-2.4s3 1 3.6 2.4zM14 4h4v16h-4s0-2.4-2-2.4-2 2.4-2 2.4H6V4h4s0 2.4 2 2.4S14 4 14 4z"></path></svg>
                            Tickets
                        </Link>
                    </span>
                </li>

                <li className='nav-right'> 
                    <span>
                        <Link to={`users/${currentUser?.id}/favorites`}>
                            Likes
                            <svg id="heart" x="0" y="0" viewBox="0 0 24 24"><path id="heart-chunky_svg__eds-icon--heart-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M18.8 6.2C18.1 5.4 17 5 16 5c-1 0-2 .4-2.8 1.2L12 7.4l-1.2-1.2C10 5.4 9 5 8 5c-1 0-2 .4-2.8 1.2-1.5 1.6-1.5 4.2 0 5.8l6.8 7 6.8-7c1.6-1.6 1.6-4.2 0-5.8zm-1.4 4.4L12 16.1l-5.4-5.5c-.8-.8-.8-2.2 0-3C7 7.2 7.5 7 8 7c.5 0 1 .2 1.4.6l2.6 2.7 2.7-2.7c.3-.4.8-.6 1.3-.6s1 .2 1.4.6c.8.8.8 2.2 0 3z"></path></svg>
                        </Link>
                    </span>
                </li>

                <li className='nav-right'> 
                    <Link to='/events/create/'>
                        <span id='create-event-in'>
                            <svg id="plus-sign" x="0" y="0" viewBox="0 0 24 24"><path id="plus-chunky_svg__eds-icon--plus-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M13 11V4h-2v7H4v2h7v7h2v-7h7v-2z"></path></svg>
                                Create an event
                        </span>
                    </Link>
                </li>
            </ul>

        </nav>
        </>
    )
}