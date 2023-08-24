import csrfFetch from "./csrf"

const RECEIVE_USER = 'receiveUser'
const REMOVE_USER = 'users/removeUser'
const RECEIVE_USER_EVENTS = 'receiveUserEvents'
const RECEIVE_USER_ORDERS = 'receiveUserOrders';

export const getUser = (userId) => state => {
    return state.users ? state.users[userId] : null
}

export const fetchUser = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`)
    const data = await response.json();
    
    dispatch({
        type: RECEIVE_USER,
        user: data.user
    })
}

export const fetchUserEvents = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch({
        type: RECEIVE_USER_EVENTS,
        user: data.user,
        events: data.events,
        orders: data.orders
    })
    return data
}

export const updateUser = (user) => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    const data = await response.json();
    dispatch({
        type: RECEIVE_USER,
        user: data.user
    })
}

export const deleteUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
        dispatch({
            type: REMOVE_USER,
            userId: userId
        })
    }
}

export default function usersReducer(state = {}, action) {
    let newState = {...state};

    switch(action.type) {
        case RECEIVE_USER:
            newState[action.user?.id] = action.user;
            return newState;
        case RECEIVE_USER_EVENTS:
            newState[action.user.id] = action.user
            return newState
        case REMOVE_USER:
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
}
