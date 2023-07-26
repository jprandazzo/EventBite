import * as sessionActions from '/Users/joerandazzo/Documents/App Academy/aA Projects/Eventbite2/eventbite/frontend/src/store/sessionReducer.js';
import { useDispatch } from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import './NavBarLoggedIn.css';

export default function NavBarLoggedIn ({user}) {
    // const navigate = Nagivate()
    const dispatch = useDispatch();
    const history = useHistory();

    const toggleDropdown = () => {
        let dropdown = document.querySelector('.user-dropdown-content')

        dropdown.style.display === 'none' ? dropdown.style.display = 'block' : dropdown.style.display = 'none'
    }
    
    const handleClick = (e) => {
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
                            <img src='https://cdn.evbstatic.com/s3-build/prod/1322331-rc2023-07-24_16.04-5e36c7c/django/images/logos/eb_orange_on_white_1200x630.png' />
                        </Link>
                    </span>
                </li>
                <li className='nav-left'> 
                    <span id='search-events'>Search Events</span>
                </li>
                <li className='nav-right'>
                    <span class='dropdown' id='user-dropdown' onClick={e => toggleDropdown(e)}>
                        {user.email}
                        <div class='dropdown-content' id='user-dropdown-content'>
                            <ul>
                                <li>Browse Events</li>
                                <li>Manage my Events</li>
                                <li>Tickets</li>
                                <li>Liked</li>
                                <li>Following</li>
                                <li>Logout</li>
                            </ul>
                        </div>
                    </span>
                </li>
                <li className='nav-right'> 
                    <span>Tickets</span>
                </li>
                <li className='nav-right'> 
                    <span>Likes</span>
                </li>
                <li className='nav-right'> 
                    <span>Create an Event</span>
                </li>
                <li>
                    <span className='nav-right'><button onClick={handleClick}>Logout</button></span>
                </li>
            </ul>

        </nav>
        </>
    )
}