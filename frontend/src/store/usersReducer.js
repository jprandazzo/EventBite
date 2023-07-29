import csrfFetch from "./csrf"

export const RECEIVE_USER = 'users/RECEIVE_USER'
export const REMOVE_USER = 'users/REMOVE_USER'

export const fetchUser = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`)
    const data = await response.json();
    
    dispatch({
        type: RECEIVE_USER,
        user: data.user
    })
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
            newState[action.user.id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.userId];
            return newState;
        default:
            return state;
    }
}
