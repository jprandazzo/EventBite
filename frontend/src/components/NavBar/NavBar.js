import * as sessionActions from '../../store/sessionReducer.js';
// import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, Redirect} from 'react-router-dom';
import UserTile from './UserTile'
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
                    <span>Logo</span>
                </li>
                <li className='left'> 
                    <span>Search Events</span>
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