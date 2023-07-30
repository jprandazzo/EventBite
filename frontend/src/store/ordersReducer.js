import csrfFetch from "./csrf";

const RECEIVE_ORDER = 'receiveOrders';
const RECEIVE_USER_ORDERS = 'receiveUserOrders';
const REMOVE_ORDER = 'removeOrders';

export const getOrder = (orderId) => state => {
    return state.orders ? state.orders[orderId] : null
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
