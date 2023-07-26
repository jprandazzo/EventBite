import * as sessionActions from '/Users/joerandazzo/Documents/App Academy/aA Projects/Eventbite2/eventbite/frontend/src/store/sessionReducer.js';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import './NavBarLoggedOut.css';

export default function NavBarLoggedIn ({user}) {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <>
        <nav id='main-navigation'>
            <ul className='navbar'>
                <li className='nav-left'> 
                    <span id='eblogo-nav'>
                        <Link to='/'>
                            <img src='https://cdn.evbstatic.com/s3-build/prod/1322331-rc2023-07-24_16.04-5e36c7c/django/images/logos/eb_orange_on_white_1200x630.png' />
                        </Link>
                    </span>
                </li>
                <li className='nav-left'> 
                    <span id='search-events'>
                        <Link to='/search'>
                            <svg id="magnifying-glass" x="0" y="0" viewBox="0 0 24 24"><path id="magnifying-glass-chunky_svg__eds-icon--magnifying-glass-chunky_base" fill-rule="evenodd" clip-rule="evenodd" d="M10 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm3.5.9c-1 .7-2.2 1.1-3.5 1.1-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 1.3-.4 2.5-1.1 3.4l5.1 5.1-1.5 1.5-5-5.1z"></path></svg>
                            Search events
                        </Link> 
                    </span>
                </li>

                <li className='nav-right'>
                    <span id='signup'>
                        <Link to='/signup'>Sign Up</Link>
                    </span>
                </li>

                <li className='nav-right'>
                    <span id='login'>
                        <Link to='/signin'>Log In</Link>
                    </span>
                </li>

                <li className='nav-right'> 
                    <span id='create-event'>
                        <Link to='/create/'>Create an event</Link>
                        </span>
                </li>

                <li className='nav-right help-organize'> 
                    <span class='dropdown' id='help'>
                        Help
                        <svg id="chevron-down" x="0" y="0" viewBox="0 0 24 24"><path id="chevron-down-chunky_svg__eds-icon--chevron-down-chunky_base" fill-rule="evenodd" clip-rule="evenodd" d="M7 10.2l5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6z"></path></svg>
                        <div class='dropdown-content' id='help-dropdown-content'>
                            <ul>
                                <li>
                                    <span>
                                    Find your tickets
                                    </span>
                                </li>
                                <li>
                                    <span>
                                    Contact an event organizer
                                    </span>
                                </li>
                                <li>
                                    <span>
                                    Visit the help center
                                    </span>
                                </li>
                            </ul> 
                        </div>
                    </span>
                </li>

                <li className='nav-right help-organize'> 
                    <span class='dropdown' id='organize-dropdown'>
                        Organize
                        <svg id="chevron-down" x="0" y="0" viewBox="0 0 24 24"><path id="chevron-down-chunky_svg__eds-icon--chevron-down-chunky_base" fill-rule="evenodd" clip-rule="evenodd" d="M7 10.2l5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6z"></path></svg>
                        <div class='dropdown-content' id='organize-dropdown-content'>
                            <ul>
                                <li>
                                    <span>
                                    Create Events
                                    </span>
                                </li>
                                <li>
                                    <span>
                                    Pricing
                                    </span>
                                </li>
                                <li>
                                    <span>
                                    Resources
                                    </span>
                                </li>
                            </ul> 
                        </div>
                    </span>
                </li>
            </ul>

        </nav>
        </>
    )
}