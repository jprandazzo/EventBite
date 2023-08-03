import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import moment from 'moment-timezone';
import { useEffect } from "react";

import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import * as sessionActions from '../../store/sessionReducer'
import * as userActions from '../../store/usersReducer'
import * as eventActions from '../../store/eventsReducer'
import "./OrganizerEventIndex.css"

export default function OrganizerEventIndex () {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const organizerEventIds = currentUser ?.organizedEvents
    const allEvents = Array.from(useSelector(eventActions.getEvents))
    const currentUserOrganizedEvents = organizerEventIds ? allEvents.filter(el => organizerEventIds.includes(el.id)) : null
    
    const gridHeaderText=['Event','','','Sold','Gross','']
    const gridHeaderClasses=['event','photo','info-description','sold','gross','edit-delete']

    useEffect(() =>{
        let getData = setTimeout(() => {
            dispatch(userActions.fetchUserEvents(currentUserId));
          }, 0)
        return () => clearTimeout(getData)
    }, [])

    const focusInput = (e) => {
        //whichever div is clicked, find its input and focus it

        if (e.target.className === 'organizer-index-search-box' || e.target.className === 'organizer-index-search-create') {
            let input = e.target.querySelector('.organizer-index-search-input')
            input.focus()
        } else if (e.target.className === 'organizer-index-search-input') {
            e.target.focus()
        }
    }

    function setClosestDivsActive(e){
            let outerDiv = e.target.closest('div')
            outerDiv.classList.add('active-div')
    }

    function setClosestDivsInactive(e) {
        //remove 'focus' class from both surrounding divs of the input
        //that was blurred
        let outerDiv = e.target.closest('div')
        outerDiv.classList.remove('active-div')
    }

    const toggleHide = e => {
        debugger
        if (['svg', 'path'].includes(e.target.nodeName.toLowerCase())) {
            debugger
            let closest = e.target.closest('div')
            closest.querySelector('.edit-delete-dropdown-content').classList.toggle('hidden')
        }
    }

    const handleDeleteEvent = (eventId) =>{
        return dispatch(eventActions.deleteEvent(eventId))
    }

    return(
        <>
        <NavBarLoggedIn />
        <main className='organizer-index-centered'>
            <h1 className='organizer-index-h1'>Events</h1>
            
            <div className='organizer-index-search-create'> 
                <div className='organizer-index-search-box' onClick={(e)=>focusInput(e)}>
                    <div id='organizer-index-search-button'>
                        <svg id="organizer-index-magnifying-glass" x="0" y="0" viewBox="0 0 24 24"><path id="magnifying-glass-chunky_svg__eds-icon--magnifying-glass-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M10 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm3.5.9c-1 .7-2.2 1.1-3.5 1.1-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 1.3-.4 2.5-1.1 3.4l5.1 5.1-1.5 1.5-5-5.1z"></path></svg>
                    </div>
                    <input className='organizer-index-search-input' placeholder='Find your dark event' onFocus={(e)=>setClosestDivsActive(e)} onBlur={(e)=>setClosestDivsInactive(e)}/>
                </div>
                <div className='organizer-index-create-button' onClick={()=>history.push('/events/create')}>
                    Create Event
                </div>
            </div>

            <div className='organizer-index-table'>
                <div className='organizer-index-table-headers'>
                    {gridHeaderText.map((e,i) =>{
                        return(
                            <div className={`column-${i+1} row-1 header-${gridHeaderClasses[i]}`}>{e ? e : ''}</div>
                        )
                    })}
                </div>
                {currentUserOrganizedEvents?.map((e,i) =>{
                    return(
                            <div className={`organizer-index-table-row`}>
                                <Link to={`/events/${e.id}`}>
                                <div className={`column-1 row-${i+2}`}>
                                    <div className='event-grid-date-month'>{moment(e.timestampStart).format('MMM')}</div>
                                    <div className='event-grid-date-day'>{moment(e.timestampStart).format('d')}</div>
                                </div>

                                <div className={`column-2 row-${i+2}`}>
                                    <div className='event-grid-photo'>photo</div>
                                </div>

                                <div className={`column-3 row-${i+2}`}>
                                    <div className='event-grid-title'>{e.title}</div>
                                    <div className='event-grid-venue'>{e.venueName}</div>
                                    <div className='event-grid-date-detailed'>{`${moment(e.timestampStart).format('dddd, MMMM d, YYYY')} at ${moment(e.timestampStart).format('h:MM A')}`}</div>
                                </div>

                                <div className={`column-4 row-${i+2}`}>
                                    <div className='event-sold'>{`${e.tixSold ? e.tixSold : 0} / ${e.capacity}`}</div>
                                </div>

                                <div className={`column-5 row-${i+2}`}>
                                    <div className='event-gross'>{`$${(e.price * e.tixSold ? e.tixSold : 0).toFixed(2)}`}</div>
                                </div>
                                </Link>

                                <div className={`column-6 row-${i+2}`}>
                                    <div className='edit-delete-dropdown' onClick={(e)=>toggleHide(e)}>
                                        <svg id="vertical-dots-chunky" x="0" y="0" viewBox="0 0 24 24"><path id="vertical-dots-chunky_svg__eds-icon--vertical-dots-chunky_dot_2" fillRule="evenodd" clipRule="evenodd" d="M10 18c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"></path><circle id="vertical-dots-chunky_svg__eds-icon--vertical-dots-chunky_dot" fillRule="evenodd" clipRule="evenodd" cx="12" cy="12" r="2"></circle><circle id="vertical-dots-chunky_svg__eds-icon--vertical-dots-chunky_dot_1" fillRule="evenodd" clipRule="evenodd" cx="12" cy="6" r="2"></circle></svg>
                                        <div className='edit-delete-dropdown-content hidden'>
                                            <Link to={`/events/${e.id}`}><div className='ed-dropdown-content-text-box'>View</div></Link>
                                            <Link to={`/events/${e.id}/edit`}><div className='ed-dropdown-content-text-box'>Edit</div></Link>
                                            <div className='ed-dropdown-content-text-box' onClick={()=>handleDeleteEvent(e.id)}>Delete</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                })}
                
            </div>

            


        </main>
        </>
    )
}