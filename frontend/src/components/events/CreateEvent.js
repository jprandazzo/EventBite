import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from 'react-calendar';
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

    const focusInput = (e) => {
        //blur anything that's currently focused
        Array.from(document.querySelectorAll('.create-event-input'))
            .forEach(el => {
                el.blur()
            })
        
        //whichever div is clicked, find its input and focus it
        if (e.target.className === 'create-event-title-box') {

            let textFieldTitle = Array.from(e.target.childNodes)[0]
            let input = e.target.childNodes[2].childNodes[0].childNodes[0]
            input.focus()
        } else if (e.target.className === 'create-event-field-text') {
            
            let outerDiv = e.target.parentNode
            let input = outerDiv.childNodes[2].childNodes[0].childNodes[0]
            input.focus()

        } else if (e.target.className === 'create-event-input') {
            e.target.focus()
        }
    }

    function setClosestDivsActive(e){
        //add 'focus' class to both surrounding divs of the input
        //that was focused
        let outerDiv = e.target.closest('div')
        outerDiv.classList.add('active-div')

        let textFieldTitle = Array.from(outerDiv.childNodes)[0]
        textFieldTitle.classList.add('active-field')
    }

    function setClosestDivsInactive(e) {
        //remove 'focus' class from both surrounding divs of the input
        //that was blurred
        let outerDiv = e.target.closest('div')
        outerDiv.classList.remove('active-div')
        let textFieldTitle = Array.from(outerDiv.childNodes)[0]
        textFieldTitle.classList.remove('active-field')
    }

    const toggleCalendar = (e) =>{
        e.preventDefault();

        if (e.target.classList.contains('timestamp-start') || e.target.classList.contains('calendar-timestamp-start')) {
            setStartCalActive(true)
        } else if (e.target.classList.contains('timestamp-end') || e.target.classList.contains('calendar-timestamp-end')) {
            setEndCalActive(true)
        } else {
            setStartCalActive(false)
            setEndCalActive(false)
        }
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
            <form className='centered-create-event' onClick={(e) =>{toggleCalendar(e); focusInput(e)}}>
                <section id='basic-info'>
                    <div id='basic-info-description-box'>
                        <svg id="title-edit-svg" x="0" y="0" viewBox="0 0 24 24"><path id="title-edit_svg__eds-icon--title-edit_base" fill-rule="evenodd" clip-rule="evenodd" d="M2 2v3h1V3h5v10H6v1h5v-1H9V3h5v2h1V2H2z"></path><g id="title-edit_svg__eds-icon--title-edit_lines" fill-rule="evenodd" clip-rule="evenodd"><path d="M15 9h7v1h-7zM15 13h7v1h-7zM6 17h16v1H6zM6 21h16v1H6z"></path></g></svg>
                        <h2 id='basic-info-h2'>Basic Info</h2>
                        <div id='basic-info-p-container'>
                            <p>
                                Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
                            </p>
                        </div>
                    </div>

                    <div className='create-event-title-box'>
                        <div className='create-event-field-text'>
                            Event Title <text style={{ color: 'red' }}>*</text>
                        </div>

                        <br />

                        <span className='create-event-field-input-box'>
                            <label>
                                <input className='create-event-field-input'
                                    type='text' 
                                    name='title'
                                    placeholder="Be deceptive and misleading. Don\'t arouse suspicion."
                                    onChange={e => setTitle(e.target.value)}
                                    onFocus={e => setClosestDivsActive(e)}
                                    onBlur={e => setClosestDivsInactive(e)}
                                />
                            </label>
                        </span>
                    </div>
                    
                    <div className='create-event-organizer-box'>
                        <div className='create-event-field-text'>
                            Organizer
                        </div>

                        <br />

                        <span className='create-event-field-input-box'>
                            <label>
                                <input className='create-event-field-organizer-input'
                                    type='text' 
                                    name='title'
                                    placeholder="Fake names are fine"
                                    onChange={e => setTitle(e.target.value)}
                                    onFocus={e => setClosestDivsActive(e)}
                                    onBlur={e => setClosestDivsInactive(e)}
                                />
                            </label>
                        </span>
                    </div>
                    <div className='event-type-container'>
                        <select name='event-type' id="event-type-dropdown" onChange={(e) =>{setEventType(e.target.value)}} defaultValue={eventTypes[0]}>
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
                        <select name='event-category' id="event-category-dropdown" onChange={(e) =>{setEventCategory(e.target.value)}} defaultValue={eventCategories[0]}>
                            {eventCategories.map(cat =>{
                                return (
                                    <option key={cat.value} value={cat.value} > 
                                        {cat.display}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </section>

                <section id='Location-box'>
                    <div className='location-description-box'>
                        <svg id="map_svg" x="0" y="0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 3c-1.1 0-2 .9-2 2H2v16h17.8c1.1 0 2.1-.9 2.1-2V5c.1-1.1-.8-2-1.9-2zm-.2 17H3V6h15v13h1c0-.6.4-1 1-1 .5 0 .9.4 1 .9-.1.6-.6 1.1-1.2 1.1zm1.2-2.7c-.3-.2-.6-.3-1-.3s-.7.1-1 .3V5c0-.6.4-1 1-1s1 .4 1 1v12.3z"></path><path id="map_svg__eds-icon--map_cross" fill-rule="evenodd" clip-rule="evenodd" d="M8.8 12.7l.7-.7-1.1-1 1.1-1-.7-.7-1.1 1-1-1-.7.7 1 1-1 1 .7.7 1-1z"></path><path id="map_svg__eds-icon--map_dash_3_" fill-rule="evenodd" clip-rule="evenodd" d="M12 10h2v1h-2z"></path><path id="map_svg__eds-icon--map_dash_2_" fill-rule="evenodd" clip-rule="evenodd" d="M15 12h1v2h-1z"></path><path id="map_svg__eds-icon--map_dash_1_" fill-rule="evenodd" clip-rule="evenodd" d="M12 15h2v1h-2z"></path><path id="map_svg__eds-icon--map_dash" fill-rule="evenodd" clip-rule="evenodd" d="M8 15h2v1H8z"></path></svg>
                        <h2 id='location-h2'>Location</h2>
                        <div id='location-p-container'>
                            <p>
                                Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
                            </p>
                        </div>
                    </div>
                    <div className='venue-address-box'>
                    <label>Venue
                        <input type='text' name='venue-name' onChange={e => setVenueName(e.target.value)} />
                    </label><br/>
                    <label>Address
                        <input type='text' name='address' onChange={e => setAddress(e.target.value)} />
                    </label><br/>
                    </div>
                </section>
                
                <section id='date-and-time'>
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
                </section>
                <section id='capacity-price-description'>
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
                <button className='create-event-button' onClick={handleCreate}>Create Event</button>
            
        </>
    )
}