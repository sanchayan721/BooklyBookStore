import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';

const getFromStorage = (key) => {
    try {
        return JSON.parse(window.localStorage.getItem(key)) || {};
    } catch (error) {
        return {};
    }
}

const initialState = getFromStorage('APP_STATE');

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
);

store.subscribe(() => {
    window.localStorage.setItem('APP_STATE', JSON.stringify(store.getState()))
});

export default store;