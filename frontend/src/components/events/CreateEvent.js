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
    const currentUser = useSelector(sessionActions.getCurrentUser)

    const [title, setTitle] = useState('')
    const [organizerName, setOrganizerName] = useState('')
    const [eventType, setEventType] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const [venueName, setVenueName] = useState('')
    const [address, setAddress] = useState('')
    const [eventStartDate, setEventStartDate] = useState(moment(moment().add(72, 'day').tz("America/New_York")).format('MM/DD/YYYY'))
    const [eventStartTime, setEventStartTime] = useState('12:00 PM')
    const [eventEndDate, setEventEndDate] = useState(eventStartDate)
    const [eventEndTime, setEventEndTime] = useState('3:00 PM')
    const [capacity, setCapacity] = useState('')
    const [errors, setErrors] = useState([]);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [startCalActive, setStartCalActive] = useState(false);
    const [endCalActive, setEndCalActive] = useState(false);
    
    const eventTypes = [
        {value: null, display: 'Type'},
        {value: 'attraction', display: 'Attraction'},
        {value: 'camp_trip_retreat', display: 'Camp/Trip/Retreat'},
        {value: 'concert_performance', display: 'Concert/Performance'},
        {value: 'conference', display: "Conference"},
        {value: 'convention', display: 'Convention'},
        {value: 'dinner_gala', display: 'Dinner/Gala'},
        {value: 'festival_fair', display: 'Festival/Fair'},
        {value: 'party_social_gathering', display: 'Party/Social Gathering'},
        {value: 'type_other', display: "Other"}
    ]

    const eventCategories = [
        {value: null, display: 'Category'},
        {value: 'community_culture', display: 'Community/Culture'},
        {value: 'fashion_beauty', display: 'Fashion/Beauty'},
        {value: 'film_media_entertainment', display: 'Film/Media/Entertainment'},
        {value: 'food_drink', display: 'Food/Drink'},
        {value: 'music', display: 'Music'},
        {value: 'category_other', display: 'Other'},
        {value: 'travel_outdoor', display: 'Travel/Outdoor'}
    ]

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

    const handleCreate = () => {
        let event = {
            title,
            organizerName,
            eventType,
            eventCategory,
            venueName,
            address,
            timestampStart: moment(`${eventStartDate} ${eventStartTime}`).tz('America/New_York').format(),
            timestampEnd: moment(`${eventEndDate} ${eventEndTime}`).tz('America/New_York').format(),
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
            {currentUser ? <NavBarLoggedIn /> : <></>}
            <br /><br />
            <hr className='create-event-hr'/>
            <br />
            <div id='back-to-organized-events'>
                <Link to='/organizer/events'><span><svg id="chevron-left-chunky_svg__eds-icon--chevron-left-chunky_svg" x="0" y="0" viewBox="0 0 24 24" ><path id="chevron-left-chunky_svg__eds-icon--chevron-left-chunky_base" fill-rule="evenodd" clip-rule="evenodd" d="M13.8 7l-5 5 5 5 1.4-1.4-3.6-3.6 3.6-3.6z"></path></svg>
                Events</span></Link>
            </div>

            <br /><br/><br/>
            <form className='centered-create-event' onClick={(e) =>toggleCalendar(e)}>
                <section id='basic-info'>
                    <div>
                        <svg id="title-edit-svg" x="0" y="0" viewBox="0 0 24 24"><path id="title-edit_svg__eds-icon--title-edit_base" fill-rule="evenodd" clip-rule="evenodd" d="M2 2v3h1V3h5v10H6v1h5v-1H9V3h5v2h1V2H2z"></path><g id="title-edit_svg__eds-icon--title-edit_lines" fill-rule="evenodd" clip-rule="evenodd"><path d="M15 9h7v1h-7zM15 13h7v1h-7zM6 17h16v1H6zM6 21h16v1H6z"></path></g></svg>
                        <span id='basic-info-title'>Basic Info</span>
                        <div id='basic-info-description'>
                            Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
                        </div>
                    </div>

                    <label>Event Title
                        <input type='text' name='title' onChange={e => setTitle(e.target.value)} />
                    </label><br/>
                    <label>Organizer
                        <input type='text' name='organizer-name' onChange={e => setOrganizerName(e.target.value)} />
                    </label><br/>
                    <div className='event-type-container'>
                        <select name='event-type' id="event-type" onChange={(e) =>{setEventType(e.target.value)}} defaultValue={eventTypes[0]}>
                            {eventTypes.map(type =>{
                                return (
                                    <option key={type.value} value={type.value} > 
                                        {type.display}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <br/>
                    <div className='event-category-container'>
                        <select name='event-category' id="event-category" onChange={(e) =>{setEventCategory(e.target.value)}} defaultValue={eventCategories[0]}>
                            {eventCategories.map(cat =>{
                                return (
                                    <option key={cat.value} value={cat.value} > 
                                        {cat.display}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <label>Venue
                        <input type='text' name='venue-name' onChange={e => setVenueName(e.target.value)} />
                    </label><br/>
                    <label>Address
                        <input type='text' name='address' onChange={e => setAddress(e.target.value)} />
                    </label><br/>

                    <div className='event-start-container'>
                        <div className='event-start-date-container'>
                            <label>Event Starts
                                <button className='timestamp-start timestamp-button' >{`${moment(eventStartDate).format('MM/DD/YYYY')}`}
                                    <Calendar className={`calendar-timestamp-start calendar ${startCalActive ? '' : 'hidden'}`} onChange={setEventStartDate} defaultValue={eventStartDate} />
                                </button>
                            </label><br/>
                        </div>
                        
                        <div className='event-start-time-container'>
                            <label>Start Time
                                    <select name='event-start-times' id="event-start-times" onChange={(e) =>{setEventStartTime(e.target.value)}} defaultValue={eventStartTime}>
                                        {[...Array(48).keys()].map(i =>{
                                            let time = moment(eventEndDate).startOf('day').add(30*i,'minutes').format('hh:mm A')
                                            return (
                                                <option key={i} value={time} > 
                                                    {`${moment(eventStartDate).startOf('day').add(30*i,'minutes').format('hh:mm A')}`}
                                                </option>
                                            )
                                        })}
                                    </select>
                            </label>
                        </div>
                    </div>

                    <br/><br/>
                    <div className='event-end-container'>
                        <div className='event-end-date-container'>
                            <label>Event Ends
                                <button className='timestamp-end timestamp-button' >{`${moment(eventEndDate).format('MM/DD/YYYY')}`}
                                    <Calendar className={`calendar-timestamp-end calendar ${endCalActive ? '' : 'hidden'}`} onChange={setEventEndDate} defaultValue={eventEndDate} />
                                </button>
                            </label><br/>
                        </div>
                        
                        <div className='event-end-time-container'>
                            <label>End Time
                                    <select name='event-end-times' id="event-end-times" onChange={(e) =>{setEventEndTime(e.target.value)}} defaultValue={eventEndTime}>
                                        {[...Array(48).keys()].map(i =>{
                                            let time = moment(eventEndDate).startOf('day').add(30*i,'minutes').format('h:mm A')
                                            return (
                                                <option key={i} value={time}> 
                                                    {`${moment(eventEndDate).startOf('day').add(30*i,'minutes').format('h:mm A')}`}
                                                </option>
                                            )
                                        })}
                                    </select>
                            </label>
                        </div>
                    </div>

                    <br/><br/>
                    <label>Capacity
                        <input type='text' name='capacity' onChange={e => setCapacity(e.target.value)} />
                    </label>
                    <label>Price
                        <input type='text' name='price' onChange={e => setPrice(e.target.value)} />
                    </label>
                    <label>Description
                        <input type='text' name='description' onChange={e => setDescription(e.target.value)} />
                    </label>
                </section>
            </form>
                <button onClick={handleCreate}>Create Event</button>
                {/* <div>
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
            
        </>
    )
}