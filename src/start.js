import React from 'react';
import * as io from 'socket.io-client';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, redirect, hashHistory, browserHistory} from 'react-router';
import {Main} from './components/Main';
import MapContainer from './components/MapContainer';
import {Landing} from './components/LandingComponents/Landing';
import Register from './components/LandingComponents/Register';
import LoginPage from './components/LoginPage';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import reduxPromise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';


export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));



const landingRouter = (<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    <Route path="/register" component={Register}/>
    <Route path="/login" component={LoginPage}/>
      <IndexRoute component={Landing}/>
    </Route>
    </Router>
</Provider>);

const loggedInRouter = (<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={MapContainer}/>
  </Router>
</Provider>);


let router;
if (location.pathname === '/landing/') {
  router = landingRouter;
} else {
  router = loggedInRouter;
}

ReactDOM.render(router, document.querySelector('#root'));
