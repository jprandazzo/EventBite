import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from 'react-calendar';
import moment from 'moment-timezone';
import { useHistory, Link, useParams } from 'react-router-dom';
import * as eventActions from "../../store/eventsReducer";
import * as sessionActions from '../../store/sessionReducer';
import * as userActions from '../../store/usersReducer';
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import './CreateEvent.css';

export default function CreateEvent () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {eventId} = useParams();
    const [prevEvent,setPrevEvent] = useState({})
    const currentUser = useSelector(sessionActions.getCurrentUser)

    useEffect(() =>{
        const awaitFetchBeforeLoading = async () => {
            const res = await dispatch(userActions.fetchUserEvents(currentUser?.id));
            setPrevEvent(res.events[eventId])
        }
        awaitFetchBeforeLoading()   
    }, [])

    useEffect(()=>{
        setTitle(prevEvent.title);
        setOrganizerName(prevEvent.organizerName);
        setEventType(prevEvent.eventType);
        setEventCategory(prevEvent.eventCategory);
        setAddress(prevEvent.address);
        setVenueName(prevEvent.venueName);
        setEventStartDate(moment(prevEvent.timestampStart).format('YYYY-MM-DD'))
        setEventStartTime(moment(prevEvent.timestampStart).format('h:mm A'))
        setEventEndDate(moment(prevEvent.timestampEnd).format('YYYY-MM-DD'))
        setEventEndTime(moment(prevEvent.timestampEnd).format('h:mm A'))
        setCapacity(prevEvent.capacity);
        setPrice(prevEvent.price);
        setDescription(prevEvent.description);
    }, [prevEvent])

    const [title, setTitle] = useState('')
    const [organizerName, setOrganizerName] = useState('')
    const [eventType, setEventType] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const [venueName, setVenueName] = useState('')
    const [address, setAddress] = useState('')
    const [eventStartDate, setEventStartDate] = useState(moment(moment(prevEvent?.timestampStart).tz("America/New_York")).format('MM/DD/YYYY'))
    const [eventStartTime, setEventStartTime] = useState(moment(moment(prevEvent?.timestampStart).tz("America/New_York")).format('h:mm A'))
    const [eventEndDate, setEventEndDate] = useState(moment(moment(prevEvent?.timestampEnd).tz("America/New_York")).format('MM/DD/YYYY'))
    const [eventEndTime, setEventEndTime] = useState(moment(moment(prevEvent?.timestampEnd).tz("America/New_York")).format('h:mm A'))
    const [capacity, setCapacity] = useState('')
    const [errors, setErrors] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [startCalActive, setStartCalActive] = useState('');
    const [endCalActive, setEndCalActive] = useState('');
    
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

    const setVenueAndAddress = (e) =>{
        setVenueName(e.target.value)
        setAddress(e.target.value)
    }
    const focusInput = (e) => {
        //blur anything that's currently focused
        Array.from(document.querySelectorAll('.create-event-field-input'))
            .forEach(el => {
                el.blur()
            })
        
        //whichever div is clicked, find its input and focus it
        if (e.target.className === 'create-event-field-box') {
            let input = e.target.querySelector('.create-event-field-input')
            input.focus()
        } else if (e.target.className === 'create-event-field-text') {

            let outerDiv = e.target.parentNode
            let input = outerDiv.querySelector('.create-event-field-input')
            input.focus()

        } else if (e.target.className === 'create-event-field-input') {
            e.target.focus()
        }
    }

    function setClosestDivsActive(e){
        //add 'focus' class to both surrounding divs of the input
        //that was focused
        if (Array.from(document.querySelector('.event-start-date-button').querySelectorAll('*')).includes(e.target)
            || Array.from(document.querySelector('.event-end-date-button').querySelectorAll('*')).includes(e.target)
            ) {
            return;
        }

        if (e.target.closest('div').classList.contains('create-event-field-text')) {
            let outerDiv = e.target.closest('div').parentNode
            outerDiv.classList.add('active-div')

            let textFieldTitle = outerDiv.querySelector('.create-event-field-text')
            textFieldTitle.classList.add('active-field')
        } else if (e.target.closest('div').classList.contains('create-event-field-box')) {
            let outerDiv = e.target.closest('div')
            outerDiv.classList.add('active-div')

            let textFieldTitle = outerDiv.querySelector('.create-event-field-text')
            textFieldTitle?.classList.add('active-field')
        }

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
        // debugger

        if ((e.target === document.querySelector('.event-start-date-button') || Array.from(document.querySelector('.event-start-date-button').querySelectorAll('*')).includes(e.target))
            && !(e.target.classList.contains("event-date-value") 
            || e.target.classList.contains('react-calendar__tile')
            || e.target.parentNode.classList.contains('react-calendar__tile'))) {
            setStartCalActive(true)
        } else if ((e.target === document.querySelector('.event-end-date-button') || Array.from(document.querySelector('.event-end-date-button').querySelectorAll('*')).includes(e.target))
            && !(e.target.classList.contains("event-date-value") 
            || e.target.classList.contains('react-calendar__tile')
            || e.target.parentNode.classList.contains('react-calendar__tile'))) {
            setEndCalActive(true)
        } else {
            setStartCalActive(false)
            setEndCalActive(false)
        }
    }

    const handleEdit = () => {
        let event = {
            eventId: prevEvent.id,
            title,
            organizerName,
            eventType,
            eventCategory,
            venueName,
            address,
            timestampStart: moment(`${eventStartDate.toString().slice(0,15)} ${eventStartTime}`).tz('America/New_York').format(),
            timestampEnd: moment(`${eventEndDate.toString().slice(0,15)} ${eventEndTime}`).tz('America/New_York').format(),
            capacity,
            price,
            description,
            organizerId: currentUser.id
        }
        debugger

        setErrors([])
        return dispatch(eventActions.updateEvent(event))
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
            
            <br />
            <div id='back-to-organized-events'>
                <Link to='/organizer/events'><span><svg id="chevron-left-chunky_svg__eds-icon--chevron-left-chunky_svg" x="0" y="0" viewBox="0 0 24 24" ><path id="chevron-left-chunky_svg__eds-icon--chevron-left-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M13.8 7l-5 5 5 5 1.4-1.4-3.6-3.6 3.6-3.6z"></path></svg>
                Events</span></Link>
            </div>

            <br /><br/><br/>
            <form className='centered-create-event' onClick={(e) =>{toggleCalendar(e); focusInput(e)}}>
                <section id='basic-info'>
                    <div id='basic-info-description-box'>
                        <svg id="title-edit-svg" x="0" y="0" viewBox="0 0 24 24"><path id="title-edit_svg__eds-icon--title-edit_base" fillRule="evenodd" clipRule="evenodd" d="M2 2v3h1V3h5v10H6v1h5v-1H9V3h5v2h1V2H2z"></path><g id="title-edit_svg__eds-icon--title-edit_lines" fillRule="evenodd" clip-rule="evenodd"><path d="M15 9h7v1h-7zM15 13h7v1h-7zM6 17h16v1H6zM6 21h16v1H6z"></path></g></svg>
                        <h2 id='basic-info-h2'>Basic Info</h2>
                        <div id='basic-info-p-container'>
                            <p>
                                Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
                            </p>
                        </div>
                    </div>

                    <div className='create-event-field-box'>
                        <div className='create-event-field-text'>
                            Event Title <text style={{ color: 'red' }}>*</text>
                        </div>

                        <br />

                        <span className='create-event-field-input-box'>
                            <label>
                                <input className='create-event-field-input'
                                    type='text' 
                                    name='title'
                                    value={title}
                                    placeholder="Be deceptive and misleading. Don't arouse suspicion."
                                    onChange={e => setTitle(e.target.value)}
                                    onFocus={e => setClosestDivsActive(e)}
                                    onBlur={e => setClosestDivsInactive(e)}
                                />
                            </label>
                        </span>
                    </div>
                    
                    <div className='create-event-field-box'>
                        <div className='create-event-field-text'>
                            Organizer
                        </div>

                        <br />

                        <span className='create-event-field-input-box'>
                            <label>
                                <input className='create-event-field-input'
                                    type='text' 
                                    name='title'
                                    placeholder="Fake names are fine. Avoid giving out details that could help slayers track us."
                                    value={organizerName}
                                    onChange={e => setOrganizerName(e.target.value)}
                                    onFocus={e => setClosestDivsActive(e)}
                                    onBlur={e => setClosestDivsInactive(e)}
                                />
                            </label>
                        </span>
                    </div>
                    <div className='event-type-container'>
                        <select name='event-type' id="event-type-dropdown" onChange={(e) =>{setEventType(e.target.value)}} defaultValue={eventType}>
                            {eventTypes.map(type =>{
                                return (
                                    <option key={type.value} value={type.value} selected={type.value === prevEvent.eventType ? true : ''}> 
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
                                    <option key={cat.value} value={cat.value} selected={cat.value === prevEvent.eventCategory ? true : ''}> 
                                        {cat.display}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </section>

                <hr className='create-event-section-division-hr' id='basic-info-location-division-hr'/>

                <section id='Location-box'>
                    <div className='location-description-box'>
                        <svg id="map_svg" x="0" y="0" viewBox="0 0 24 24"><path fillRule="evenodd" clip-rule="evenodd" d="M20 3c-1.1 0-2 .9-2 2H2v16h17.8c1.1 0 2.1-.9 2.1-2V5c.1-1.1-.8-2-1.9-2zm-.2 17H3V6h15v13h1c0-.6.4-1 1-1 .5 0 .9.4 1 .9-.1.6-.6 1.1-1.2 1.1zm1.2-2.7c-.3-.2-.6-.3-1-.3s-.7.1-1 .3V5c0-.6.4-1 1-1s1 .4 1 1v12.3z"></path><path id="map_svg__eds-icon--map_cross" fillRule="evenodd" clip-rule="evenodd" d="M8.8 12.7l.7-.7-1.1-1 1.1-1-.7-.7-1.1 1-1-1-.7.7 1 1-1 1 .7.7 1-1z"></path><path id="map_svg__eds-icon--map_dash_3_" fillRule="evenodd" clip-rule="evenodd" d="M12 10h2v1h-2z"></path><path id="map_svg__eds-icon--map_dash_2_" fillRule="evenodd" clip-rule="evenodd" d="M15 12h1v2h-1z"></path><path id="map_svg__eds-icon--map_dash_1_" fillRule="evenodd" clip-rule="evenodd" d="M12 15h2v1h-2z"></path><path id="map_svg__eds-icon--map_dash" fillRule="evenodd" clip-rule="evenodd" d="M8 15h2v1H8z"></path></svg>
                        <h2 id='location-h2'>Location</h2>
                        <div id='location-p-container'>
                            <p>
                                Pick a prime spot to amass the largest number of fools you can. The more the bloodier!
                            </p>
                        </div>
                    </div>
                    <div className='create-event-field-box' id='create-event-venue-box'>
                        <span className='create-event-field-input-box' id='create-event-venue-input-box'>
                            <label>
                                <input className='create-event-field-input'
                                    id='create-event-venue-input'
                                    type='text' 
                                    name='venue-name'
                                    placeholder="Open air venues are best - no invitation inside needed. Make sure to check the weather forecast."
                                    value={venueName}
                                    onChange={e => setVenueAndAddress(e)}
                                    onFocus={e => setClosestDivsActive(e)}
                                    onBlur={e => setClosestDivsInactive(e)}
                                />
                                <div className='create-edit-page-magnifying-glass'><svg id="magnifying-glass-venue" x="0" y="0" viewBox="0 0 24 24"><path id="magnifying-glass-chunky_svg__eds-icon--magnifying-glass-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M10 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm3.5.9c-1 .7-2.2 1.1-3.5 1.1-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 1.3-.4 2.5-1.1 3.4l5.1 5.1-1.5 1.5-5-5.1z"></path></svg></div>
                            </label>
                        </span>
                    </div>
                </section>

                <hr className='create-event-section-division-hr' id='location-date-division-hr'/>
                
                <section id='date-and-time'>
                    <div className='datetime-description-box'>
                        <svg id="calendar_svg" x="0" y="0" viewBox="0 0 24 24"><path id="calendar_svg__eds-icon--calendar_base" fillRule="evenodd" clip-rule="evenodd" d="M17 4V2h-1v2H8V2H7v2H2v18h20V4h-5zm4 17H3V9h18v12zM3 8V5h4v1h1V5h8v1h1V5h4v3H3z"></path><g id="calendar_svg__eds-icon--calendar_squares" fillRule="evenodd" clip-rule="evenodd"><path d="M15 16h2v2h-2zM11 16h2v2h-2zM7 16h2v2H7zM15 12h2v2h-2zM11 12h2v2h-2zM7 12h2v2H7z"></path></g></svg>
                        <h2 id='location-h2'>Date and time</h2>
                        <div id='location-p-container'>
                            <p>
                                Choose a day and time to gather your unsuspecting victims together. Nighttime is usually best, unless you're indoors of course.
                            </p>
                        </div>
                    </div>
                    
                    <div className='event-start-box'>
                        <div className='event-start-date-button timestamp-button'>
                        <div className='create-edit-page-small-calendar'><svg id="small_calendar_svg" x="0" y="0" viewBox="0 0 24 24"><path id="calendar-chunky_svg__eds-icon--calendar-chunky_base" d="M16.9 6.5v-2h-2v2h-6v-2h-2v2h-2v13h14v-13h-2zm0 11h-10v-7h10v7z"></path></svg></div>
                            <div className='event-date-text event-date-text' id='event-start-date-text'>Event Starts</div>
                            <div className='event-date-value event-date-value' id='event-start-date-value'>{`${moment(eventStartDate).format('MM/DD/YYYY')}`}</div>
                            <div className='calendar-box' id='event-start-date-box'>
                                <Calendar className={`calendar-timestamp-start calendar ${startCalActive ? '' : 'hidden'}`} onChange={setEventStartDate} defaultValue={eventStartDate} />
                            </div>
                            <br/>
                        </div>

                        <div className='event-start-time-button timestamp-button' onClick={(e) =>{
                                    document.querySelector('.event-start-times-dropdown').classList.toggle('hidden');
                                    document.querySelector('.event-start-times-dropdown').setAttribute('size', 12)}}>
                            <div className='event-time-text' id='event-start-time-text'>Start Time</div>
                            <div className='event-time-value' id='event-start-time-value'>{eventStartTime}</div>
                            <label>
                                    <select className='event-start-times-dropdown hidden' name='event-start-times' id="event-start-times" onChange={(e) =>{setEventStartTime(e.target.value)}} defaultValue={eventStartTime}>
                                        {[...Array(48).keys()].map(i =>{
                                            let time = moment(eventStartDate).startOf('day').add(30*i,'minutes').format('hh:mm A')
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

                    <div className='event-end-container'>
                        <div className='event-end-date-button timestamp-button'
                            /*onClick={e => setClosestDivsActive(e)}*/
                            >
                            <div className='create-edit-page-small-calendar'><svg id="small_calendar_svg" x="0" y="0" viewBox="0 0 24 24"><path id="calendar-chunky_svg__eds-icon--calendar-chunky_base" d="M16.9 6.5v-2h-2v2h-6v-2h-2v2h-2v13h14v-13h-2zm0 11h-10v-7h10v7z"></path></svg></div>
                            <div className='event-date-text' id='event-end-date-text'>Event Ends</div>
                            <div className='event-date-value' id='event-end-date-value'>{`${moment(eventEndDate).format('MM/DD/YYYY')}`}</div>
                            <div className='calendar-box' id='event-end-date-box'>
                                <Calendar className={`calendar-timestamp-end calendar ${endCalActive ? '' : 'hidden'}`} onChange={setEventEndDate} defaultValue={eventEndDate} />
                            </div>
                            <br/>
                        </div>
                        
                        <div className='event-end-time-button timestamp-button' onClick={(e) =>{
                                    document.querySelector('.event-end-times-dropdown').classList.toggle('hidden');
                                    document.querySelector('.event-end-times-dropdown').setAttribute('size', 12)}}>
                            <div className='event-time-text' id='event-end-time-text'>Start Time</div>
                            <div className='event-time-value' id='event-end-time-value'>{eventEndTime}</div>
                            <label>
                                    <select className='event-end-times-dropdown hidden' name='event-end-times' id="event-end-times" onChange={(e) =>{setEventEndTime(e.target.value)}} defaultValue={eventEndTime}>
                                        {[...Array(48).keys()].map(i =>{
                                            let time = moment(eventEndDate).startOf('day').add(30*i,'minutes').format('hh:mm A')
                                            return (
                                                <option key={i} value={time} > 
                                                    {`${moment(eventEndDate).startOf('day').add(30*i,'minutes').format('hh:mm A')}`}
                                                </option>
                                            )
                                        })}
                                    </select>
                            </label>
                            <br/>
                        </div>
                    </div>
                </section>
                <br/><br/><br/>
                <hr className='create-event-section-division-hr' id='date-misc-division-hr'/>

                <section id='misc-description'>
                    <div className='misc-description-box'>
                        <svg id="map_svg" x="0" y="0" viewBox="0 0 24 24"><path fillRule="evenodd" clip-rule="evenodd" d="M20 3c-1.1 0-2 .9-2 2H2v16h17.8c1.1 0 2.1-.9 2.1-2V5c.1-1.1-.8-2-1.9-2zm-.2 17H3V6h15v13h1c0-.6.4-1 1-1 .5 0 .9.4 1 .9-.1.6-.6 1.1-1.2 1.1zm1.2-2.7c-.3-.2-.6-.3-1-.3s-.7.1-1 .3V5c0-.6.4-1 1-1s1 .4 1 1v12.3z"></path><path id="map_svg__eds-icon--map_cross" fillRule="evenodd" clip-rule="evenodd" d="M8.8 12.7l.7-.7-1.1-1 1.1-1-.7-.7-1.1 1-1-1-.7.7 1 1-1 1 .7.7 1-1z"></path><path id="map_svg__eds-icon--map_dash_3_" fillRule="evenodd" clip-rule="evenodd" d="M12 10h2v1h-2z"></path><path id="map_svg__eds-icon--map_dash_2_" fillRule="evenodd" clip-rule="evenodd" d="M15 12h1v2h-1z"></path><path id="map_svg__eds-icon--map_dash_1_" fillRule="evenodd" clip-rule="evenodd" d="M12 15h2v1h-2z"></path><path id="map_svg__eds-icon--map_dash" fillRule="evenodd" clip-rule="evenodd" d="M8 15h2v1H8z"></path></svg>
                        <h2 id='location-h2'>Miscellaneous details</h2>
                        <div id='location-p-container'>
                            <p>
                                Fill in your event with even more misleading details!
                            </p>
                        </div>
                    </div>
                    <br/><br/>
                    <div className='create-event-field-box' id='create-event-capacity-box' onClick={(e) =>{focusInput(e)}}>
                        <div className='create-event-field-text' id='event-capacity-text'>Capacity</div>
                        <span className='create-event-field-input-box' id='create-event-capacity-input-box'>
                            <label>
                                <input className='create-event-field-input'
                                    id='create-event-capacity-input'
                                    type='text' 
                                    placeholder="How many victims do you plan to invite? Be ambitious!"
                                    value={capacity}
                                    onChange={e => {setCapacity(e.target.value)}}
                                    onFocus={e => setClosestDivsActive(e)}
                                    onBlur={e => setClosestDivsInactive(e)}
                                />
                            </label>
                        </span>
                    </div>
                    <div className='create-event-field-box' id='create-event-price-box' onClick={(e) =>{focusInput(e)}}>
                        <div className='create-event-field-text' id='event-price-text'><p>Price<br/>$</p></div>
                        <span className='create-event-field-input-box' id='create-event-price-input-box'>
                            <label>
                                <input className='create-event-field-input'
                                    id='create-event-price-input'
                                    type='text' 
                                    placeholder="Why not charge people while you feast on them? Kill two bats with one stone."
                                    value={price}
                                    onChange={e => {setPrice(e.target.value)}}
                                    onFocus={e => setClosestDivsActive(e)}
                                    onBlur={e => setClosestDivsInactive(e)}
                                />
                            </label>
                        </span>
                    </div>
                    <div className='create-event-field-box' id='create-event-description-box' onClick={(e) =>{focusInput(e)}}>
                        <div className='create-event-field-text' id='event-description-text'>Description</div>
                        <span className='create-event-field-input-box' id='create-event-description-input-box'>
                            <textarea className='create-event-field-input'
                                id='create-event-description-input'
                                placeholder="Give a fake event description to entice the humans to attend. Be descriptive. Be misleading. Humans are gullible."
                                value={description}
                                onChange={e => {setDescription(e.target.value)}}
                                onFocus={e => setClosestDivsActive(e)}
                                onBlur={e => setClosestDivsInactive(e)}
                            />
                        </span>
                    </div>
                </section>

                <div className='whitespace' />
            </form>
        <div className='create-event-button-box'>
            <hr id='create-event-bottom-fullscreen-hr' />
            <button className='create-event-discard-button' onClick={()=>history.goBack()}>Discard</button>
            <button className='create-event-button' onClick={handleEdit}>Save Changes</button>
        </div>
        </>
    )
}