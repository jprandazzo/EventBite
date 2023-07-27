import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as eventActions from "../../store/eventsReducer"
import * as sessionActions from '../../store/sessionReducer'
import './CreateEvent.css'
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";

export default function CreateEvent () {
    const dispatch = useDispatch();
    const history = useHistory();
    let current_user = useSelector(sessionActions.getCurrentUser)

    const [title, setTitle] = useState('')
    const [organizerName, setOrganizerName] = useState('')
    const [eventType, setEventType] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const [venueName, setVenueName] = useState('')
    const [address, setAddress] = useState('')
    const [timestampStart, setTimestampStart] = useState('')
    const [timestampEnd, setTimestampEnd] = useState('')
    const [capacity, setCapacity] = useState('')
    const [errors, setErrors] = useState([]);
    
    const handleCreate = () => {
        let event = {
            title,
            organizerName,
            eventType,
            eventCategory,
            venueName,
            address,
            // timestampStart,
            // timestampEnd,
            capacity,
            organizerId: current_user.id
        }
        debugger
        setErrors([])
        return dispatch(eventActions.createEvent(event))
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
            // })
            // .then(() =>{history.push('/')});
    };

    return (
        <>
            <NavBarLoggedIn user={current_user}></NavBarLoggedIn>
            <br /><br />

            <span id='back-to-organized-events'>
                <Link to='/organizer/events'>Events</Link>
            </span>
            <br /><br/><br/>
            <section id='basic-info'>
                <form>Create Event<br/>
                    <label>Title
                        <input type='text' name='title' onChange={e => setTitle(e.target.value)} />
                    </label><br/>
                    <label>Organizer Name
                        <input type='text' name='organizer-name' onChange={e => setOrganizerName(e.target.value)} />
                    </label><br/>
                    <label>Type
                        <input type='text' name='type' onChange={e => setEventType(e.target.value)} />
                    </label><br/>
                    <label>Category
                        <input type='text' name='category' onChange={e => setEventCategory(e.target.value)} />
                    </label><br/>
                    <label>Venue
                        <input type='text' name='venue-name' onChange={e => setVenueName(e.target.value)} />
                    </label><br/>
                    <label>Address
                        <input type='text' name='address' onChange={e => setAddress(e.target.value)} />
                    </label><br/>
                    <label>Start Date/Time
                        <input type='text' name='timestamp_start' onChange={e => setTimestampStart(e.target.value)} />
                    </label><br/>
                    <label>End Date/Time
                        <input type='text' name='timestamp-end' onChange={e => setTimestampEnd(e.target.value)} />
                    </label><br/>
                    <label>Capacity
                        <input type='text' name='capacity' onChange={e => setCapacity(e.target.value)} />
                    </label>
                </form>
                <button onClick={handleCreate}>Create Event</button>
                {/*<div>
                    <div>
                    <svg id="title-edit-svg" x="0" y="0" viewBox="0 0 24 24"><path id="title-edit_svg__eds-icon--title-edit_base" fill-rule="evenodd" clip-rule="evenodd" d="M2 2v3h1V3h5v10H6v1h5v-1H9V3h5v2h1V2H2z"></path><g id="title-edit_svg__eds-icon--title-edit_lines" fill-rule="evenodd" clip-rule="evenodd"><path d="M15 9h7v1h-7zM15 13h7v1h-7zM6 17h16v1H6zM6 21h16v1H6z"></path></g></svg>
                    </div>
                    <span id='basic-info-title'>Basic Info</span>
                    <div id='basic-info-description'>
                        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
                    </div>
                </div>

                <form>
                    <div className='create-event-title-box'>
                        <div className='create-event-placeholder-title'>
                            Event Title <span className='required-red'>*</span>
                        </div>

                        <br />

                        <span>
                            <label>
                                <input className='create-event-title-input'
                                        type='text' 
                                        name='title'
                                        onChange={e => setTitle(e.target.value)}
                                        onFocus={e => setClosestDivsActive(e)}
                                        onBlur={e => setClosestDivsInactive(e)}
                                />
                            </label>
                        </span>
                    </div>
                </form> */}
            </section>
            
        </>
    )
}