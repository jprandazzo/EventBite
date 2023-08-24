import { useDispatch, useSelector } from 'react-redux';
import {useHistory, Link, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import * as sessionActions from '../../store/sessionReducer.js';
import * as eventActions from'../../store/eventsReducer';
import * as userActions from '../../store/usersReducer';
import './NavBarLoggedIn.css';

export default function NavBarLoggedIn () {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const location = useLocation();

    // useEffect(() =>{
    //     let getData = setTimeout(() => {
    //         if (currentUserId) dispatch(userActions.fetchUserEvents(currentUserId));
    //       }, 0)
    //     return () => clearTimeout(getData)
    // }, [])

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

    const searchBar = () => {
        if (location.pathname === '/search'){
            return(<></>)
        } else return(
        <li className={'nav-left'}> 
            <Link to='/search'>
                <div id='nav-search-events'>
                    <svg id="magnifying-glass" x="0" y="0" viewBox="0 0 24 24"><path id="magnifying-glass-chunky_svg__eds-icon--magnifying-glass-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M10 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm3.5.9c-1 .7-2.2 1.1-3.5 1.1-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 1.3-.4 2.5-1.1 3.4l5.1 5.1-1.5 1.5-5-5.1z"></path></svg>
                    <div id='search-text'>Find your next meal</div>
                </div>
            </Link> 
        </li>
        )
    }

    const logout = async (e) => {
        e.preventDefault();
        let res = await dispatch(sessionActions.logout())
        history.push('/signin')
    }


    return (
        <>
        <nav id='main-navigation-in'>
            <div className='navbar-in-container'>
                <ul className='navbar-ul'>
                    <li className='nav-left'> 
                        <Link to='/'>
                            <div id='eblogo-nav' />
                        </Link>
                    </li>

                    {searchBar()}

                    <li className='nav-right user-dropdown'>
                        <div className='dropdown' id='user-in-dropdown' /*onClick={e =>toggleDropdown(e)} onMouseOver={e => showDropdown(e)} onBlur={e =>hideDropdown(e)} */ >
                            <div id='user-in-dropdown-email'>{currentUser?.email}</div>
                            <svg id="user-in-chevron-down" x="0" y="0" viewBox="0 0 24 24"><path id="chevron-down-chunky_svg__eds-icon--chevron-down-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M7 10.2l5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6z"></path></svg>
                            <div className='dropdown-content hidden' id='user-in-dropdown-content'>
                                <ul>
                                    <li onClick={()=>history.push('/search')}><div className='dropdown-content-text-box'>Browse Events</div></li>
                                    <li onClick={()=>history.push('/organizer/events')}><div className='dropdown-content-text-box'>Manage my Events</div></li>
                                    <li onClick={()=>history.push(`/user/${currentUser?.id}`)}><div className='dropdown-content-text-box'>Tickets ({currentUser?.attendingEvents?.length})</div></li>
                                    {/* <li><div className='dropdown-content-text-box'>Liked</div></li>
                                    <li><div className='dropdown-content-text-box'>Following</div></li> */}
                                    <li onClick={logout}><div className='dropdown-content-text-box'>Logout</div></li>
                                </ul>
                            </div>
                            <div id='user-icon-svg-circle-container'>
                                <svg id="user-icon-svg" x="0" y="0" viewBox="0 0 24 24"><path id="user-chunky_svg__eds-icon--user-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M12 18c-1.2 0-2.4-.3-3.5-.7.6-1.3 2-2.2 3.5-2.2s2.9.9 3.5 2.2c-1.1.4-2.3.7-3.5.7zm6.5-2.9c-.4.4-.8.8-1.3 1.1a5.989 5.989 0 00-10.6 0c-.5-.3-.9-.7-1.3-1.1L4 16.5c2.1 2.3 5 3.5 8 3.5s5.9-1.3 8-3.5l-1.5-1.4z"></path><path id="user-chunky_svg__eds-icon--user-chunky_circle" fillRule="evenodd" clipRule="evenodd" d="M12 4C9.7 4 7.8 5.9 7.8 8.2s1.9 4.2 4.2 4.2 4.2-1.9 4.2-4.2S14.3 4 12 4zm0 6.4c-1.2 0-2.2-1-2.2-2.2C9.8 7 10.8 6 12 6s2.2 1 2.2 2.2c0 1.2-1 2.2-2.2 2.2z"></path></svg>
                            </div>
                        </div>
                    </li>

                    <li className='nav-right'> 
                        <Link to={`/user/${currentUser?.id}`}>
                            <div id='nav-in-tickets'>    
                                <svg id='nav-ticket-svg' viewBox="0 0 24 24"><path d="M10 13v-2h4v2zm6 5V6h-.4C15 7.4 13.8 8.4 12 8.4S9 7.4 8.4 6H8v12h.4c.6-1.4 1.8-2.4 3.6-2.4s3 1 3.6 2.4zM14 4h4v16h-4s0-2.4-2-2.4-2 2.4-2 2.4H6V4h4s0 2.4 2 2.4S14 4 14 4z"></path></svg>
                                <div id='nav-in-tickets-text'>Tickets</div>
                            </div>
                        </Link>
                    </li>

                    <li className='nav-right'> 
                        <Link to={`/users/${currentUser?.id}/favorites`}>
                            <div id='nav-in-favorites'>
                                <div id='nav-in-favorites-text'>Likes</div>
                                <svg id="heart-svg" x="0" y="0" viewBox="0 0 24 24"><path id="heart-chunky_svg__eds-icon--heart-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M18.8 6.2C18.1 5.4 17 5 16 5c-1 0-2 .4-2.8 1.2L12 7.4l-1.2-1.2C10 5.4 9 5 8 5c-1 0-2 .4-2.8 1.2-1.5 1.6-1.5 4.2 0 5.8l6.8 7 6.8-7c1.6-1.6 1.6-4.2 0-5.8zm-1.4 4.4L12 16.1l-5.4-5.5c-.8-.8-.8-2.2 0-3C7 7.2 7.5 7 8 7c.5 0 1 .2 1.4.6l2.6 2.7 2.7-2.7c.3-.4.8-.6 1.3-.6s1 .2 1.4.6c.8.8.8 2.2 0 3z"></path></svg>
                            </div>
                        </Link>
                    </li>

                    <li className='nav-right'> 
                        <Link to='/events/create/'>
                            <div id='create-event-in'>
                                <svg id="plus-sign" x="0" y="0" viewBox="0 0 24 24"><path id="plus-chunky_svg__eds-icon--plus-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M13 11V4h-2v7H4v2h7v7h2v-7h7v-2z"></path></svg>
                                <div id='create-event-in-text'>Create an event</div>
                            </div>
                        </Link>
                    </li>

                    <li className='nav-right about-the-developer'> 
                        <div className='help-organize-about-dropdown' id='about-dropdown'>
                            <div className='help-organize-about-text'>About the developer</div>
                            <svg className="help-organize-about-chevron-down" id='about-chevron' x="0" y="0" viewBox="0 0 24 24"><path id="chevron-down-chunky_svg__eds-icon--chevron-down-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M7 10.2l5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6z"></path></svg>
                            <div className='dropdown-content hidden' id='about-the-developer-dropdown-content'>
                                <ul>
                                    <li>
                                        <a target="_blank" href='https://www.github.com/jprandazzo'>
                                            <div className='dropdown-content-text-box'>Joe's Github</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" href='https://www.linked.com/in/jprandazzo'>
                                            <div className='dropdown-content-text-box'>Joe's LinkedIn</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" href='/signin'>
                                            <div className='dropdown-content-text-box'>Joe's Website</div>
                                        </a>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                    </li>
                    
                </ul>
            <hr className='navbar-in-fullscreen-hr'/>
            </div>
        </nav>        
        </>
    )
}