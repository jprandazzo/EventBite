import { Link } from 'react-router-dom';
import './NavBarLoggedOut.css';

export default function NavBarLoggedIn ({currentUser}) {

    return (
        <>
        <nav id='main-navigation'>
            <div className='navbar-out-container'>
                <ul className='navbar-ul'>
                    <li className='nav-left'> 
                        <Link to='/'>
                            <div id='eblogo-nav' />
                        </Link>
                    </li>

                    <li className='nav-left'> 
                        <Link to='/search'>
                            <div id='search-events'>
                                <svg id="magnifying-glass" x="0" y="0" viewBox="0 0 24 24"><path id="magnifying-glass-chunky_svg__eds-icon--magnifying-glass-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M10 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm3.5.9c-1 .7-2.2 1.1-3.5 1.1-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 1.3-.4 2.5-1.1 3.4l5.1 5.1-1.5 1.5-5-5.1z"></path></svg>
                                <div id='search-text'><text>Search events</text></div>
                            </div>
                        </Link> 
                    </li>

                    <li className='nav-right'>
                        <Link to='/signup'>
                            <div id='nav-out-signup'>
                                <div id='nav-out-signup-text'>Sign Up
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className='nav-right'>
                        <Link to='/signin'>
                            <div id='nav-out-signin'>
                                <div id='nav-out-signin-text'>Log In
                                </div>
                            </div>
                        </Link>
                    </li>

                    <li className='nav-right'> 
                        <Link to='/events/create/'>
                            <div id='create-event-out'>
                                <div id='create-event-out-text'>Create an event</div>
                            </div>
                        </Link>
                    </li>

                    <li className='nav-right help-organize'> 
                        <div className='help-organize-dropdown' id='help-dropdown'>
                            <div className='help-organize-text' id='help-text'>Help</div>
                            <svg className="help-organize-chevron-down" id='help-chevron' x="0" y="0" viewBox="0 0 24 24"><path id="chevron-down-chunky_svg__eds-icon--chevron-down-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M7 10.2l5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6z"></path></svg>
                            <div className='dropdown-content hidden' id='help-dropdown-content'>
                                <ul>
                                    <li>
                                        <Link to='/signin'>
                                            <div className='dropdown-content-text-box'>Find your tickets</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/signin'>
                                            <div className='dropdown-content-text-box'>Contact an event organizer</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/signin'>
                                            <div className='dropdown-content-text-box'>Visit the help center</div>
                                        </Link>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                    </li>

                    <li className='nav-right help-organize'> 
                        <div className='help-organize-dropdown' id='organize-dropdown'>
                            <div className='help-organize-text' id='organize-text'>Organize</div>
                            <svg className="help-organize-chevron-down" id='organize-chevron' x="0" y="0" viewBox="0 0 24 24"><path id="chevron-down-chunky_svg__eds-icon--chevron-down-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M7 10.2l5 5 5-5-1.4-1.4-3.6 3.6-3.6-3.6z"></path></svg>
                            <div className='dropdown-content hidden' id='organize-dropdown-content'>
                                <ul>
                                    <li>
                                        <Link to='/signin'>
                                            <div className='dropdown-content-text-box'>Create Events</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/signin'>
                                            <div className='dropdown-content-text-box'>Pricing</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/signin'>
                                            <div className='dropdown-content-text-box'>Resources</div>
                                        </Link>
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