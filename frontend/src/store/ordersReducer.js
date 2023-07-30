import csrfFetch from "./csrf";

const RECEIVE_ORDER = 'receiveOrders';
const RECEIVE_USER_ORDERS = 'receiveUserOrders';
const RECEIVE_USER_EVENTS = 'receiveUserEvents'
const REMOVE_ORDER = 'removeOrders';

export const getOrder = (orderId) => state => {
    return state.orders ? state.orders[orderId] : null
}

export const getOrders = state => {
    return state && state.orders ? Object.values(state.orders) : []
}

export const fetchOrder = orderId => async dispatch =>{
    const response = await fetch(`/api/orders/${orderId}`)
    const data = await response.json();

    if (response.ok) {
        dispatch({
            type: RECEIVE_ORDER,
            order: data.order
        })
    }
    return [data.order, true]
}

export const createOrder = (order) => async dispatch => {
    const response = await csrfFetch(`/api/orders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(order)
    })
    const data = response.json()

    dispatch({
        type: REMOVE_ORDER,
        order: data.order
    })
}

export const deleteOrder = (orderId) => async dispatch => {
    const response = await csrfFetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })

    dispatch({
        type: REMOVE_ORDER,
        orderId: orderId
    })
}

const ordersReducer = (oldState = {}, action) => {
    let newState = {...oldState}
    switch (action.type) {
        // case RECEIVE_ORDERS:    
        //     newState = {...oldState,...action.orders}
        //     return newState
        case RECEIVE_ORDER:
            newState[action.order.id] = action.order
            return newState
        case RECEIVE_USER_EVENTS:
            newState = {...oldState,...action.orders}
            return newState
        case REMOVE_ORDER:
            delete newState[action.orderId]
            return newState
        default:
            return oldState
    }
}

export default ordersReducer