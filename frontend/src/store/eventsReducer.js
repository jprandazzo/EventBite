import csrfFetch from "./csrf";

const RECEIVE_EVENT = 'events/receiveEvent'
const RECEIVE_EVENTS = 'events/receiveEvents'
const REMOVE_EVENT = 'events/removeEvent'

// get events from store
export const getEvents = (state) => {
    return state.events ? Object.values(state.events) : []
}

export const getEvent = (eventId) => state => {
    return state.events ? state.events[eventId] : null
}

// dispatch actions

export const fetchEvents = () => async dispatch => {
    const response = await fetch('/api/events')
    const data = await response.json();

    dispatch({
        type: RECEIVE_EVENTS,
        events: data
    })
}

export const fetchEvent = (eventId) => async dispatch => {
    const response = await fetch(`/api/events/${eventId}`)
    const data = await response.json();

    dispatch({
        type: RECEIVE_EVENT,
        event: data
    })
}

export const createEvent = (event) => async dispatch => {
    const response = await csrfFetch(`/api/events/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    })
    const data = await response.json();

    dispatch({
        type: RECEIVE_EVENT,
        event: data
    })
}

export const updateEvent = (event) => async dispatch => {
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    })
    const data = await response.json();

    dispatch({
        type: RECEIVE_EVENT,
        event: data
    })
}

export const deleteEvent = (eventId) => async dispatch => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })

    dispatch({
        type: REMOVE_EVENT,
        eventId: eventId
    })
}
  
// reducer actions

const eventsReducer = (oldState = {}, action) => {
    let newState = {...oldState}

    switch (action.type) {
        case RECEIVE_EVENTS:
            newState = {...oldState,...action.events}
            return newState
        case RECEIVE_EVENT:
            newState[action.event.id] = action.event
            return newState
        case REMOVE_EVENT:
            delete newState[action.eventId]
            return newState
        default:
            return oldState
    }
}

export default eventsReducer