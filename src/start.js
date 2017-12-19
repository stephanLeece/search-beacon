import React from 'react';
import * as io from 'socket.io-client';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, redirect, hashHistory, browserHistory} from 'react-router';
import ReactBody from './components/ReactBody';
import {Landing} from './components/LandingComponents/Landing';
import UserHome from './components/LoggedInComponents/UserHome';
import EditProfile from './components/LoggedInComponents/EditProfile';
import OtherUser from './components/LoggedInComponents/OtherUser';
import Search from './components/LoggedInComponents/Search';
import {HeaderLanding, HeaderLoggedIn} from './components/Header';
import MapContainer from './components/LoggedInComponents/MapContainer';
import Convo from './components/LoggedInComponents/Convo';
import Messages from './components/LoggedInComponents/Messages';

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
    <Route path="/" component={ReactBody}>
    <Route path="/register" component={{header: HeaderLanding, main: Register}}/>
    <Route path="/login" component={{header: HeaderLanding, main: LoginPage}}/>
    <IndexRoute component={{header: HeaderLanding, main: Landing}}/>
    </Route>
    </Router>
</Provider>);




const loggedInRouter = (<Provider store={store}>
  <Router history={browserHistory}>
  <Route path="/" component={ReactBody}>
  <Route path="/edit" component={{header: HeaderLoggedIn, main: EditProfile}}/>
  <Route path="/result/:id" component={{header: HeaderLoggedIn, main: OtherUser}}/>
  <Route path="/convo/:id" component={{header: HeaderLoggedIn, main: Convo}}/>
  <Route path="/messages" component={{header: HeaderLoggedIn, main: Messages}}/>
  <Route path="/search" component={{header: HeaderLoggedIn, main: Search}}/>
  <Route path="/map" component={{header: HeaderLoggedIn, main: MapContainer}}/>
    <IndexRoute component={{header: HeaderLoggedIn, main: UserHome}} />
    </Route>
  </Router>
</Provider>);


let router;
if (location.pathname === '/landing/') {
  router = landingRouter;
} else {
  router = loggedInRouter;
}

ReactDOM.render(router, document.querySelector('#root'));
