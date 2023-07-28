import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import * as eventActions from "../../store/eventsReducer"
import * as sessionActions from '../../store/sessionReducer'
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import NotFoundErrorPage from "../errorPages/NotFoundErrorPage";
import './EditEvent.css'

export default function EditEvent () {
    const dispatch = useDispatch();
    let current_user = useSelector(sessionActions.getCurrentUser)
    
    const {eventId} = useParams();

    const [doneLoading, setDoneLoading] = useState(false);
    const [event, setEvent] = useState(undefined)

    useEffect(() =>{
        const awaitFetch = async () => {
            const res = await dispatch(eventActions.fetchEvent(eventId))
            setEvent(res[0])
            setDoneLoading(res[1])
        }
        awaitFetch()
    }, [])
    
    useEffect(() =>{
        setTitle(event ? event.title : '')
        setOrganizerName(event ? event.organizerName : '')
        setEventType(event ? event.eventType : '')
        setEventCategory(event ? event.eventCategory : '')
        setVenueName(event ? event.venueName : '')
        setAddress(event ? event.address : '')
        setTimestampStart(event ? event.timestampStart : '')
        setTimestampEnd(event ? event.timestampEnd : '')
        setCapacity(event ? event.capacity : '')
        setPrice(event ? event.price : '')
        setDescription(event ? event.description : '')
    },[event])

    const [title, setTitle] = useState(event ? event.title : '')
    const [organizerName, setOrganizerName] = useState(event ? event.organizerName : '')
    const [eventType, setEventType] = useState(event ? event.eventType : '')
    const [eventCategory, setEventCategory] = useState(event ? event.eventCategory : '')
    const [venueName, setVenueName] = useState(event ? event.venueName : '')
    const [address, setAddress] = useState(event ? event.address : '')
    const [timestampStart, setTimestampStart] = useState(event ? event.timestampStart : '')
    const [timestampEnd, setTimestampEnd] = useState(event ? event.timestampEnd : '')
    const [capacity, setCapacity] = useState(event ? event.capacity : 0)
    const [price, setPrice] = useState(event ? event.price : 0);
    const [description, setDescription] = useState(event ? event.description : '')
    const [errors, setErrors] = useState([]);
    
    const handleUpdate = () => {
        let event = {
            id: eventId,
            title,
            organizerName,
            eventType,
            eventCategory,
            venueName,
            address,
            timestampStart,
            timestampEnd,
            capacity,
            price,
            description
        }
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
            // .then(() =>{history.push('/')});
    };

    if (!doneLoading) {
        return <></>
    } else {
        if (event) {
            return (
                <>
                    <NavBarLoggedIn />
                    <br /><br />

                    <span id='back-to-organized-events'>
                        <Link to='/organizer/events'>Events</Link>
                    </span>
                    <br /><br/><br/>
                    <section id='basic-info'>
                        <form><h1 className='h1-default'>Edit Event</h1><br/>
                            <label>Title
                                <input type='text' name='title' onChange={e => setTitle(e.target.value)} value={title} />
                            </label><br/>
                            <label>Organizer Name
                                <input type='text' name='organizer-name' onChange={e => setOrganizerName(e.target.value)} value={organizerName}/>
                            </label><br/>
                            <label>Type
                                <input type='text' name='type' onChange={e => setEventType(e.target.value)} value={eventType}/>
                            </label><br/>
                            <label>Category
                                <input type='text' name='category' onChange={e => setEventCategory(e.target.value)} value={eventCategory}/>
                            </label><br/>
                            <label>Venue
                                <input type='text' name='venue-name' onChange={e => setVenueName(e.target.value)} value={venueName}/>
                            </label><br/>
                            <label>Address
                                <input type='text' name='address' onChange={e => setAddress(e.target.value)} value={address}/>
                            </label><br/>
                            <label>Start Date/Time
                                <input type='text' name='timestamp_start' onChange={e => setTimestampStart(e.target.value)} value={timestampStart}/>
                            </label><br/>
                            <label>End Date/Time
                                <input type='text' name='timestamp-end' onChange={e => setTimestampEnd(e.target.value)} value={timestampEnd}/>
                            </label><br/>
                            <label>Capacity
                                <input type='text' name='capacity' onChange={e => setCapacity(e.target.value)} value={capacity}/>
                            </label> <br/>
                            <label>Price
                                <input type='text' name='price' onChange={e => setPrice(e.target.value)} value={`${price}`}/>
                            </label> <br/>
                            <label>Description
                                <input type='text' name='description' onChange={e => setDescription(e.target.value)} value={description}/>
                            </label>
                        </form>
                        <button onClick={handleUpdate}>Save</button>
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
        } else return <NotFoundErrorPage />

    }
}