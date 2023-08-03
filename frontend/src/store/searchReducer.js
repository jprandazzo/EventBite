import csrfFetch from "./csrf"

const GET_SEARCH_RESULTS = 'getSearchResults'
const CLEAR_SEARCH_RESULTS = 'clearSearchResults'

export const getSearchResults = (state) => {
    return Object.keys(state.search).length ? Object.values(state.search) : []
}

export const fetchSearchResults = (query) => async dispatch =>{
    const response = await csrfFetch(`/api/events/search?string=${query.string}&price=${query.price}&category=${query.category}`);
    const data = await response.json();
    dispatch(receiveSearchResults(data));
}

export const receiveSearchResults = (searchResults) => ({
    type: GET_SEARCH_RESULTS,
    searchResults
})

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})

const searchReducer = (state = {}, action) => {
    const newState = {...state}

    switch (action.type) {
        case GET_SEARCH_RESULTS:
            debugger
            return action.searchResults.events
        case CLEAR_SEARCH_RESULTS:
            return {};
        default:
            return newState
    }
}

export default searchReducer