import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

const INITIAL_STATE = {
    products: [],
    filter: ""
}

function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.products
            }
        case "SET_FILTER":
            return {
                ...state,
                filter: action.filter
            }
        default: return state
    }
}

const store = createStore(reducer, composeWithDevTools());

export default store;