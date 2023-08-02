import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import moment from 'moment-timezone';
import * as eventActions from '../../store/eventsReducer'
import * as sessionActions from '../../store/sessionReducer'
import * as orderActions from '../../store/ordersReducer'
import * as userActions from '../../store/usersReducer'
import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import NavBarLoggedOut from '../NavBar/NavBarLoggedOut';
import './ShowEvent.css'
import NotFoundErrorPage from "../errorPages/NotFoundErrorPage";

export default function ShowEvent () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {eventId} = useParams();
    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))

    const [doneLoading, setDoneLoading] = useState(false);
    const [event, setEvent] = useState(undefined)
    const [numTickets, setNumTickets] = useState(0)
    const [activeHeart, setActiveHeart] = useState(false)
    
    useEffect(() =>{
        const awaitFetchBeforeLoading = async () => {
            const res = await dispatch(eventActions.fetchEvent(eventId))
            if (currentUserId) dispatch(userActions.fetchUserEvents(currentUserId));
            setEvent(res[0])
            setDoneLoading(res[1])
        }
        awaitFetchBeforeLoading()
    }, [])

    useEffect(() =>{
        setActiveHeart(currentUser ? currentUser.likedEvents.includes(parseInt(eventId)) : false)
    }, [currentUser])

    // const handleTicketDecreaseStyling = () => {
    //     el = document.querySelector('.ticket-count-decrease')

    //     if (numTickets) {
    //         el.classList.add('clickable-ticket-button')
    //         el.addEventListener('click', setNumTickets(numTickets-1))
    //     } else {
    //         if (el.classList.includes('clickable-ticket-button')) {
    //             el.classList.remove('clickable-ticket-button')};
    //         el.removeEventListener('click');
    //     }
    // }

    const handlePurchase = (eventId) => {

        if (!currentUser) {
            history.push('/signin')
        } else {
            const order = {
                numTickets,
                ticketholderId: currentUser.id,
                eventId
            }

            return dispatch(orderActions.createOrder(order))
            .then(history.push(`/user/${currentUser.id}`));
        }
    }

    const handlePlusMinusClick = (e) =>{
        if (e.target.innerHTML === '+') {
            setNumTickets(numTickets+1)
        } else {
            setNumTickets(numTickets-1)
        }
    }

    const heartIcon = () => {
        if (!activeHeart) {
            return (<svg id='fa-heart-empty' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> {/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>)
        } else return (<svg id='fa-heart-filled' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>)
    }

    const heartReact = () =>{ 
        setActiveHeart(!activeHeart)
        currentUser['currentPageId'] = eventId    
        dispatch(userActions.updateUser(currentUser)) 
    }
    
    if (!doneLoading) {
        return <></>
    } else {
        if (event) {
            return (
                <>
                <script src="https://kit.fontawesome.com/12ab2d7ded.js" crossorigin="anonymous"></script>
                    {currentUser ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
                    <main>
                        <div className='show-event-photo-container'>
                            <svg width='1676' height='430' viewBox='0 0 1676 430' fill-rule='evenodd'><g clip-path='url(#clip0_3405_50198)'><path fill-rule='evenodd' d='M1669.31 -124.702C1704.63 -198.281 1599.75 -278.89 1440.21 -219.509C1280.67 -160.128 1138.67 -174.472 940.588 -234.668C588.163 -341.792 438.492 -309.897 215.804 -220.763C150.423 -195.199 15.9418 -122.33 0.814447 -35.3897C-18.0424 73.26 298.334 62.7189 143.288 203.358C-11.7568 343.996 26.7216 552.457 835.628 313.658C939.215 283.079 1109.58 269.122 1259.68 366.729C1409.78 464.336 1549.16 434.834 1602.55 362.937C1716.96 208.836 1609.92 -1.08292 1669.31 -124.702Z' fill='#EDF1FC'/></g><defs><clipPath id='clip0_3405_50198'><rect width='1676' height='430' fill='white'/></clipPath></defs></svg>
                            <div className='show-event-photo'>

                            </div>
                        </div>

                        <div className='show-event-centered show-event-details-container'>

                            <div className='show-event-basic-details-1'>
                                <div className='show-event-date-1'>
                                    {moment(event.timestampStart).format('dddd, MMMM 5')}
                                </div>
                                <div className='show-event-title-1'>
                                    {event.title}
                                </div>
                                <div className='show-event-organizer'>By {event.organizerName}</div>
                                {/* <div className='show-event-type'>{event.type}</div>
                                <div className='show-event-category'>{event.category}</div> */}
                                <div className='show-event-heart-like' onClick={heartReact}>
                                    {/* <svg id="heart-chunky_svg" x="0" y="0" viewBox="0 0 24 24" ><path id="heart-chunky_svg__eds-icon--heart-chunky_base" fillRule="nonzero" clipRule="evenodd" d="M18.8 6.2C18.1 5.4 17 5 16 5c-1 0-2 .4-2.8 1.2L12 7.4l-1.2-1.2C10 5.4 9 5 8 5c-1 0-2 .4-2.8 1.2-1.5 1.6-1.5 4.2 0 5.8l6.8 7 6.8-7c1.6-1.6 1.6-4.2 0-5.8zm-1.4 4.4L12 16.1l-5.4-5.5c-.8-.8-.8-2.2 0-3C7 7.2 7.5 7 8 7c.5 0 1 .2 1.4.6l2.6 2.7 2.7-2.7c.3-.4.8-.6 1.3-.6s1 .2 1.4.6c.8.8.8 2.2 0 3z" fill='#D1420A'></path></svg> */}
                                    {heartIcon()}
                                </div>
                            </div>
                        

                            <div className='ticket-purchase-container'>
                                <div className='ticket-price-count-container'>
                                    <div className='ticket-price-container'>
                                        General Admission<br/>{event.price ? `$${Number(event.price).toFixed(2)}` : 'Free'}
                                    </div>
                                    <button className={`${numTickets ? 'clickable-count ticket-count-decrease' : 'unclickable-count ticket-count-decrease'}`}>—</button>
                                    <div className='ticket-count-text'>{numTickets}</div>
                                    <button className='ticket-count-increase clickable-count' onClick={e=>{handlePlusMinusClick(e)}}>+</button>
                                </div>
                                <button className='ticket-purchase-button' onClick={() =>handlePurchase(event.id)}>{event.price ? 'Get tickets' : 'Reserve a spot'}</button>
                            </div>

                            <div className='show-event-when-where-container'>
                                <div className='show-event-when-where'>When and where</div>

                                <div className='show-event-timestamp-container'>
                                    <div className='show-event-svg-container'>
                                        <svg className='show-event-svg' id='calendar-svg' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">{/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/></svg>
                                    </div>
                                    <div className='show-event-date-location-header'>Date and time</div>
                                    <div className='show-event-date-location-detail'>{`${moment(event.timestampStart).format('dddd, MMMM d · h:mm')}-${moment(event.timestampEnd).format('h:mm A')}`}</div>
                                </div>

                                <div class="vl"></div>

                                <div className='show-event-location-container'>
                                    <div className='show-event-svg-container'>
                                        <svg className='show-event-svg' i id='map-pin-svg' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">{/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                    </div>
                                    <div className='show-event-date-location-header'>Location</div>
                                    <div className='show-event-date-location-detail'>{event.address}</div>
                                </div>
                            </div>
                            
                            <div className='show-event-about'>
                                <div className='about-event-title'>About this event</div>
                                <div className='event-length'>
                                    <svg id='clock-svg' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}<path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                                    <div className='event-length-in-hours'>
                                        {moment.duration(moment(event.timestampEnd).diff(moment(event.timestampStart))).asHours()} hours
                                    </div>
                                </div>
                                
                                <div className='event-description'>
                                    {event.description}
                                </div>
                            </div>
                        </div>
                        
                    </main>
                </>
            )
        } else return <NotFoundErrorPage />
    }

    
    
}