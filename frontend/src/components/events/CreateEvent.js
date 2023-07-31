import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from 'react-calendar';
// import moment from 'moment';
import moment from 'moment-timezone';
import { useHistory, Link } from 'react-router-dom';
import * as eventActions from "../../store/eventsReducer";
import * as sessionActions from '../../store/sessionReducer';
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import './CreateEvent.css';

export default function CreateEvent () {
    const dispatch = useDispatch();
    const history = useHistory();
    let currentUser = useSelector(sessionActions.getCurrentUser)

    const [title, setTitle] = useState('')
    const [organizerName, setOrganizerName] = useState('')
    const [eventType, setEventType] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const [venueName, setVenueName] = useState('')
    const [address, setAddress] = useState('')
    const [eventStartDate, setEventStartDate] = useState(moment().add(72, 'day').tz("America/New_York"))
    // console.log(`moment=${moment(moment().add(72,'day')).format('YYYY-MM-DD')}`)
    const [eventStartTime, setEventStartTime] = useState(moment().startOf('hour').tz("America/New_York"))
    const [timestampStart, setTimestampStart] = useState(moment().add(72, 'day').startOf('hour').tz("America/New_York"))
    const [timestampEnd, setTimestampEnd] = useState(moment().add(72, 'day').add(3, 'hour').startOf('hour').tz("America/New_York")/*.format('MMMM Do YYYY h:mm a')*/)
    const [capacity, setCapacity] = useState('')
    const [errors, setErrors] = useState([]);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [startCalActive, setStartCalActive] = useState(false);
    const [endCalActive, setEndCalActive] = useState(false);
    
    // useEffect(() =>{

    // }, [])

    const toggleCalendar = (e) =>{
        // e.stopPropagation();
        e.preventDefault();

        if (e.target.classList.contains('timestamp-start') || e.target.classList.contains('calendar-timestamp-start')) {
            setStartCalActive(true)
        } else if (e.target.classList.contains('timestamp-end') || e.target.classList.contains('calendar-timestamp-end')) {
            setEndCalActive(true)
        } else {
            setStartCalActive(false)
            setEndCalActive(false)
        }
        // switch (e.target.classList[0]) {
        //     case 'timestamp-start' || 'react-calendar' || 'calendar-timestamp-start':
        //         setStartCalActive(true)
        //         console.log(`startCalActive=${startCalActive}`)
        //         break;
        //     case 'calendar-timestamp-start':
        //         setStartCalActive(true)
        //         break;
        //     case 'timestamp-end':
        //         setEndCalActive(true)
        //         break;
        //     case 'calendar-timestamp-end':
        //         setEndCalActive(true)
        //         break;
        //     default:
        //         setStartCalActive(false)
        //         setEndCalActive(false)
        // }
                
        // }
        // if (e.target.classList.contains('timestamp-start')) {
        //     setStartCalActive(true)
        // } else if (e.target.classList.contains('timestamp-end')) {
        //     debugger
        //     setEndCalActive(true)
        // } else {
        //     debugger
        //     setStartCalActive(false)
        //     setEndCalActive(false)
        }
        // debugger

        // e.target.childNodes[1].classList.toggle('hidden')
        // debugger
    

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
            price,
            description,
            organizerId: currentUser.id
        }
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
            .then(() =>{history.push(`/organizer/events`)});
    };

    return (
        <>
            <NavBarLoggedIn />
            <br /><br />

            <span id='back-to-organized-events'>
                <Link to='/organizer/events'>Events</Link>
            </span>
            <br /><br/><br/>
            <section id='basic-info' onClick={(e) =>toggleCalendar(e)}>
                <form><b>Create Event</b><br/>
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

                    <div className='event-start-container'>
                        <div className='event-start-date-container'>
                            <label>Event Starts
                                <button className='timestamp-start timestamp-button' >{`${moment(timestampStart).format('MM/DD/YYYY')}`}
                                    <Calendar className={`calendar-timestamp-start calendar ${startCalActive ? '' : 'hidden'}`} onChange={setTimestampStart} defaultValue={timestampStart} />
                                </button>
                            </label><br/>
                        </div>
                        
                        <div className='event-start-time-container'>
                            <label>{`${timestampStart.format('hh:mm a')}`}
                                <input list="event-times" name="event-start-time" onChange={setEventStartTime}/>

                                    <select id="event-times">
                                        <option value={`${eventStartTime}.startOf('day').format('hh:mm a')}`}/>
                                        <option value="12:30 am"/>
                                        <option value="Mint"/>
                                        <option value="Strawberry"/>
                                        <option value="Vanilla"/>
                                    </select>
                        
                            </label>
                        </div>
                    </div>

                    <label>End Date/Time
                        <button type='text' className='timestamp-end timestamp-button' /*onClick={(e) =>toggleCalendar(e)}*/>{`${moment(timestampEnd).format('MM/DD/YYYY')}`}
                            <Calendar className={`calendar-timestamp-end calendar ${endCalActive ? '' : 'hidden'}`} onChange={setTimestampEnd} defaultValue={timestampEnd} />
                        </button>
                    </label><br/>
                    <label>Capacity
                        <input type='text' name='capacity' onChange={e => setCapacity(e.target.value)} />
                    </label>
                    <label>Price
                        <input type='text' name='price' onChange={e => setPrice(e.target.value)} />
                    </label>
                    <label>Description
                        <input type='text' name='description' onChange={e => setDescription(e.target.value)} />
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