import * as sessionActions from '../../store/sessionReducer.js';
// import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, Redirect} from 'react-router-dom';
import UserTile from './UserTile/UserTile.js'
import './NavBar.css';

export default function NavBar () {
    // const navigate = Nagivate()
    const dispatch = useDispatch();
    const history = useHistory();
    const redirect = (path) => {
        return <Redirect to={`${path}`} />
    }

    let user = useSelector(sessionActions.getCurrentUser)
    
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
            .then(redirect('/signin'))
        

    }

    return (
        <>
        <nav id='main-navigation'>
            <ul className='navbar'>
                <li className='left'> 
                    <span id='eblogo-nav'>
                    <img src='https://cdn.evbstatic.com/s3-build/prod/1322331-rc2023-07-24_16.04-5e36c7c/django/images/logos/eb_orange_on_white_1200x630.png' />
                    </span>
                </li>
                <li className='left'> 
                    <span id='search'>Search Events</span>
                </li>
                <li className='right'>
                    <UserTile user={user}/>
                </li>
                <li className='right'> 
                    <span>Tickets</span>
                </li>
                <li className='right'> 
                    <span>Likes</span>
                </li>
                <li className='right'> 
                    <span>Create an Event</span>
                </li>
                <li>
                    <span className='right'><button onClick={handleClick}>Logout</button></span>
                </li>
            </ul>

        </nav>
        </>
    )
}