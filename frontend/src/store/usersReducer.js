import { csrfFetch } from "./csrf"

export const RECEIVE_USER = 'users/RECEIVE_USER'
export const REMOVE_USER = 'users/REMOVE_USER'

export const fetchUser = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`)
    const data = await response.json();

    dispatch({
        type: RECEIVE_USER,
        user: data
    })
}

export const createUser = (user) => async dispatch => {
    const response = await csrfFetch(`/api/users/`, {
        method: 'POST',
        body: JSON.stringify(user)
    })
    const data = await response.json();

    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch({
        type: RECEIVE_USER,
        user: data
    })
}

export const loginUser = user => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    // debugger
    let data = await res.json();
    // debugger
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    // debugger
    dispatch({
        type: RECEIVE_USER,
        user: data
    })
};

export const logoutUser = userId => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    sessionStorage.setItem('currentUser', null)
    dispatch({
        type: REMOVE_USER,
        userId: userId
    });
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
        user: data
    })
}

export default function usersReducer(state = {}, action) {
    let newState = {...state};

    switch(action.type) {
        case RECEIVE_USER:
            newState[action.user.id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
}
