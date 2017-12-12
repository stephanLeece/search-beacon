import React from 'react';
import * as io from 'socket.io-client';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, redirect, hashHistory, browserHistory} from 'react-router';
import {Landing} from './landing';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));



const loggedInRouter = (<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={Landing}/>
  </Router>
</Provider>);

const notLoggedInRouter = (<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Landing}/>
  </Router>
</Provider>);


let router;
if (location.pathname === '/welcome/') {
  router = notLoggedInRouter;
} else {
  router = loggedInRouter;
}

ReactDOM.render(router, document.querySelector('#root'));
