import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import App from './App';

import alertsReducer from './store/alertsReducer';
import selectsReducer from './store/selectsReducer';
import paramsReducer from './store/paramsReducer';
import artistsReducer from './store/artistsReducer';
import albumsReducer from './store/albumsReducer';
import tracksReducer from './store/tracksReducer';
import usersReducer from "./store/usersReducer";
import trackHistoryReducer from './store/trackHistoryReducer';

import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware, ConnectedRouter} from "connected-react-router";
import {loadFromLocalStorage, saveToLocalStorage} from "./store/localStorage";
import {PersistedStateType} from "./store/reducerTypes";



export const history = createBrowserHistory();


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
   selects: selectsReducer,
   alerts: alertsReducer,
   params: paramsReducer,
   artists: artistsReducer,
   albums: albumsReducer,
   tracks: tracksReducer,
   trackHistory: trackHistoryReducer,
   users: usersReducer,
   router: connectRouter(history)
});



type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const middleware = [
   thunkMiddleware,
   routerMiddleware(history)
]

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

export const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
   saveToLocalStorage({
      users: {
         user: store.getState().users.user
      }
   });
});


const app = (
   <>
   <Provider store={store}>
      <ConnectedRouter history={history}>
         <App/>
      </ConnectedRouter>
   </Provider>
   </>
);

ReactDOM.render(app, document.getElementById('root'));