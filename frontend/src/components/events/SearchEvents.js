import NavBarLoggedIn from "../NavBar/NavBarLoggedIn";
import NavBarLoggedOut from "../NavBar/NavBarLoggedOut";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/sessionReducer.js';
import * as eventActions from'../../store/eventsReducer';
import * as userActions from '../../store/usersReducer';
import * as searchActions from '../../store/searchReducer';
import './SplashPage.css'
import './SearchEvents.css'

export default function EventsSearch () {

    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const prevString = searchParams.get('string');
    const prevPrice = searchParams.get('price');
    const prevCategory = searchParams.get('category');
    // const prevDate = searchParams.get('date')

    const currentUserId = useSelector(sessionActions.getCurrentUser)?.id
    const currentUser = useSelector(userActions.getUser(currentUserId))
    const allEvents = useSelector(eventActions.getEvents)
    const [queryString, setQueryString] = useState(prevString ? prevString : '')
    const [queryPrice, setQueryPrice] = useState(prevPrice ? prevPrice : null)
    const [queryCategory, setQueryCategory] = useState(prevCategory ? prevCategory : null)
    // const [queryDate, setQueryDate] = useState(prevDate ? prevDate : null)
    const [timer, setTimer] = useState(0);

    const searchResults = useSelector(searchActions.getSearchResults)

    useEffect(() =>{
        dispatch(eventActions.fetchEvents())
        let getData = setTimeout(() => {
            if (currentUserId) dispatch(userActions.fetchUserEvents(currentUserId));
          }, 0)
        return () => clearTimeout(getData)
    }, [])

    const heartIcon = (e) => {
        if (currentUser) {
            if (currentUser.likedEvents && currentUser.likedEvents.includes(e.id)) {
                return(
                <div className='search-event-filled-heart'>
                    <svg id='fa-heart-filled' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                    </svg>
                </div>)
            } else {
                return (
                <div className='search-event-empty-heart'>
                    <svg id='fa-heart-empty' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> 
                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                    </svg>
                </div>)
            }
        } else return (
                <div className='search-event-empty-heart'>
                    <svg id='fa-heart-empty' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> 
                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                    </svg>
                </div>)
    }

    const AllEventsOrSearchResults = () => {
        if (!(prevString || prevPrice || prevCategory)) {
            return(
            allEvents?.map((ev,i)=>{
                console.log()
                    return(
                        <Link to={`/events/${ev.id}`} className='search-event-tile-link' target='_blank'>
                        <div className='search-event-tile' id={`search-event-tile-${i}`}>
                            <div className='search-event-tile-photo'><img alt='event image' src={ev.imgUrl}/></div>
                            <div className='search-event-heart-like' onClick={(e)=>heartReact(e,ev)}>{heartIcon(ev)}</div>
                            <div className='search-event-tile-title'>{ev.title}</div>
                            <div className='search-event-tile-timestanp'>{moment(ev.timestampStart).format('ddd, MMM d · h:MM A')}</div>
                            <div className='search-event-tile-location'>{ev.address}</div>
                            <div className='search-event-tile-price'>{ev.price ? `$${Number(ev.price).toFixed(2)}` : 'Free'}</div>
                        </div> 
                        </Link>
                    )
                }))
        } else {
            return(
            searchResults.map((ev,i)=>{
                return(
                    <Link to={`/events/${ev.id}`} className='search-event-tile-link' target='_blank'>
                    <div className='search-event-tile' id={`search-event-tile-${i}`}>
                        <div className='search-event-tile-photo'><img alt='event-image' src={ev.imgUrl}/></div>
                        <div className='search-event-heart-like' onClick={(e)=>heartReact(e,ev)}>{heartIcon(ev)}</div>
                        <div className='search-event-tile-title'>{ev.title}</div>
                        <div className='search-event-tile-timestanp'>{moment(ev.timestampStart).format('ddd, MMM d · h:MM A')}</div>
                        <div className='search-event-tile-location'>{ev.address}</div>
                        <div className='search-event-tile-price'>{ev.price ? `$${Number(ev.price).toFixed(2)}` : 'Free'}</div>
                    </div> 
                    </Link>
                )
            }))
        }
    }

    const heartReact = (e,ev) =>{ 
        e.stopPropagation();
        e.preventDefault();
        if (!currentUser) history.push('/signin')
        
        if (currentUser.likedEvents) {
            if (currentUser.likedEvents.includes(ev.id)) {
                const index = currentUser.likedEvents.indexOf(ev.id)
                currentUser.likedEvents.splice(index,1)
            } else currentUser.likedEvents.push(ev.id)
        }
        else currentUser['likedEvents'] = [ev.id]
          
        dispatch(userActions.updateUser(currentUser)) 
    }

    useEffect(()=>{
        history.push(`/search?${queryString ? `string=${queryString}` : ''}${queryPrice ? `&price=${queryPrice}` : ''}${queryCategory ? `&category=${queryCategory}` : ''}`)
        clearTimeout(timer);
        setTimer(setTimeout(()=>{
            dispatch(searchActions.fetchSearchResults({
                string: queryString,
                price: queryPrice,
                category: queryCategory
            }))
        }, 250))
    }, [queryString, queryPrice, queryCategory])

    const clearSearchQuery = () => {
        // UNNECESSARY BECAUSE CHANGING STATE VARIABLES TRIGGERS USE EFFECT AND SEARCHES
        // dispatch(searchActions.fetchSearchResults({
        //     string: null,
        //     price: null,
        //     category: null
        // })) 

        let elements = document.getElementsByTagName("input");

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].type === "radio") {
                elements[i].checked = false;
            }
        }

        setQueryString('')
        setQueryPrice(null)
        setQueryCategory(null)
        // setQueryDate(null)
        history.push('/search')
    }

    const setSearchText = (e) => {
        e.preventDefault()

        setQueryString(e.target.value);
        
    }

    // if (prevString || prevPrice || prevCategory) {
    // 
    //}

    if (!allEvents) {
        return <></>
    } else return(
        <>
        {currentUser ? <NavBarLoggedIn /> : <NavBarLoggedOut />}
        <main id='search-main'>
        <section className='search-split-left'>
            <div id='search-input-section-container'>
                <div id='search-page-magnifying-glass'><svg id="magnifying-glass" x="0" y="0" viewBox="0 0 24 24"><path id="magnifying-glass-chunky_svg__eds-icon--magnifying-glass-chunky_base" fillRule="evenodd" clipRule="evenodd" d="M10 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm3.5.9c-1 .7-2.2 1.1-3.5 1.1-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 1.3-.4 2.5-1.1 3.4l5.1 5.1-1.5 1.5-5-5.1z"></path></svg></div>
                <div id='search-input-box'>
                    <form onSubmit={(e)=> e.preventDefault()}>
                        <input type='text' id='search-page-input' placeholder='Where will you find your next victim?' value={queryString} onChange={setSearchText}/>
                        <input type='submit' style={{display: 'none'}} />
                    </form>
                </div>
                {/* <button id='search-page-button' onClick={sub=>handleSubmit(sub)}>Search</button> */}
            </div>

            <div id='search-page-hr' />

            <div id='filter-and-search-container'>
                <div id='clear-search-query-button' onClick={clearSearchQuery}>
                    <div id='search-query-inner-text'>Clear Selection</div>
                </div>
                <div id='search-filters-container'>
                    <div id='search-filters-title'>Filters</div>
                    {/* <div className='search-radio-button-section'>
                        <div className='search-radio-button-title'>
                            Date
                        </div>
                        <div className='search-radio-button'>
                            <div className='search-radio-button-label'>
                                <input type='radio' value='Today' />
                                Today
                            </div>
                            <div className='search-radio-button-label'>
                            <input type='radio' value='Tomorrow' />
                                Tomorrow
                            </div>
                            <div className='search-radio-button-label'>
                            <input type='radio' value='Pick' />
                                Pick a Date...
                            </div>
                        </div>
                    </div> */}

                    <div className='search-radio-button-section'>
                        <div className='search-radio-button-title'>
                            Price
                        </div>
                        <div className='search-radio-button'>
                            <div className='search-radio-button-label'>
                                <input type='radio' name='price' value='free' checked={prevPrice === 'free'} onClick={(event)=>setQueryPrice(event.target.value)} />
                                Free
                            </div>
                            <div className='search-radio-button-label'>
                                <input type='radio' name='price' value='paid' checked={prevPrice === 'paid'} onClick={(event)=>setQueryPrice(event.target.value)} />
                                Paid
                            </div>
                        </div>
                    </div>

                    <div className='search-radio-button-section'>
                    <div className='search-radio-button-title'>
                            Category
                        </div>
                        <div className='search-radio-button'>
                            <div className='search-radio-button-label'>
                                <input type='radio' name='category' value='community_culture' checked={prevCategory === 'community_culture'} onClick={event=> setQueryCategory(event.target.value)}/>
                                Community/Culture
                            </div>
                            <div className='search-radio-button-label'>
                                <input type='radio' name='category' value='fashion_beauty' checked={prevCategory === 'fashion_beauty'} onClick={event=> setQueryCategory(event.target.value)}/>
                                Fashion/Beauty
                            </div>
                            <div className='search-radio-button-label'>
                                <input type='radio'  name='category'value='film_media_entertainment' checked={prevCategory === 'film_media_entertainment'} onClick={event=> setQueryCategory(event.target.value)}/>
                                Film/Media/Entertainment
                            </div>
                            <div className='search-radio-button-label'>
                                <input type='radio'  name='category'value='food_drink' checked={prevCategory === 'food_drink'} onClick={event=> setQueryCategory(event.target.value)}/>
                                Food/Drink
                            </div>
                            <div className='search-radio-button-label'>
                                <input type='radio'  name='category'value='music' checked={prevCategory === 'music'} onClick={event=> setQueryCategory(event.target.value)}/>
                                Music
                            </div>
                            <div className='search-radio-button-label'>
                                <input type='radio'  name='category'value='travel_outdoor' checked={prevCategory === 'travel_outdoor'} onClick={event=> setQueryCategory(event.target.value)}/>
                                Travel/Outdoor
                            </div>
                            <div className='search-radio-button-label'>
                                <input type='radio'  name='category' value='category_other' checked={prevCategory === 'category_other'} onClick={event=> setQueryCategory(event.target.value)}/>
                                Other
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            
        <section id='search-events-split-middle'>
            <div className='search-event-tile-grid'>
                {AllEventsOrSearchResults()}
            </div>
        </section>
        
        
        <section className='search-split-right' id='search-side-photo'>
            <div className='google-maps-search-image' />
        </section>
        </main>
    </>
    )
}