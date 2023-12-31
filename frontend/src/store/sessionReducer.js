import csrfFetch from "./csrf"

const SET_CURRENT_USER = 'session/setCurrentUser'
const REMOVE_CURRENT_USER = 'session/removeCurrentUser'
const RECEIVE_USER = 'receiveUser'
const RECEIVE_USER_EVENTS = 'receiveUserEvents'

// const RECEIVE_ERRORS = 'receiveErrors';
// const REMOVE_ERRORS = 'removeErrors';

const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user
});
  
const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
});

export const getCurrentUser = (state) => {
    return state.session.user ? state.session.user : null
}

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

// async function restoreCSRF () {
//     const response = await csrfFetch("/api/session");
//     storeCSRFToken(response)
//     return response
// }
  
const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const login = ({ email, password }) => async dispatch => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    debugger
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user))
    dispatch({
        type: RECEIVE_USER,
        user: data.user
    })
    debugger
    return response;
};

export const restoreSession = () => async dispatch => {
    let res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    let data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
}

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser())
    return response
};

export const signup = user => async dispatch => {
    const {firstName, lastName, email, password} = user;
    const response = await csrfFetch('api/users', {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    });
    const data = await response.json();

    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

const initialState = {
    user: JSON.parse(sessionStorage.getItem('currentUser'))
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, user: action.payload};
        case REMOVE_CURRENT_USER:
            return {...state, user: null};
        case RECEIVE_USER:
            debugger
            return {...state, user: action.user}
        case RECEIVE_USER_EVENTS:
            return {...state, user: action.user}
        default:
            return state;
    }
};

export default sessionReducer
