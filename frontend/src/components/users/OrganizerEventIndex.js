import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as sessionActions from '../../store/sessionReducer'
import * as userActions from '../../store/usersReducer'
import * as eventActions from '../../store/eventsReducer'
import "./OrganizerEventIndex.css"

export default function OrganizerEventIndex () {
    const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getCurrentUser);
    
    // currentUser.organizedEvents
    useEffect(() =>{
        dispatch(userActions.fetchUser(currentUser.id))
    })
    return(
        <>
        <NavBarLoggedIn />
        <br/><br/>
        <h1 className='organizer-index'>Events</h1>
        </>
    )
}