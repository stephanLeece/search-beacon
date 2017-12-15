import React from 'react';
import * as io from 'socket.io-client';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, redirect, hashHistory, browserHistory} from 'react-router';
import {Main} from './components/Main';
import MapContainer from './components/MapContainer';
import {Landing} from './components/LandingComponents/Landing';
import Register from './components/LandingComponents/Register';
import {LoginPage} from './components/LoginPage';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import reduxPromise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';


export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));



const notLoggedInRouter = (<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
    <Route path="/register" component={Register}/>
    <Route path="/login" component={LoginPage}/>
      <IndexRoute component={Landing}/>
    </Route>
    </Router>
</Provider>);

// const notLoggedInRouter = (<Provider store={store}>
//   <Router history={hashHistory}>
//     <Route path="/" component={Map}/>
//   </Router>
// </Provider>);


// let router;
// if (location.pathname === '/welcome/') {
//   router = notLoggedInRouter;
// } else {
//   router = loggedInRouter;
// }

ReactDOM.render(notLoggedInRouter, document.querySelector('#root'));
