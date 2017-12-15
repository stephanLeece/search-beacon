import React from 'react';
import {Link, browserHistory} from 'react-router';
// import axios from '../axios';
// import {getSocket} from '../socket';

export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (

<div id='landing'>
<h1>Landing!</h1>
<Link to="/register">Sign Up</Link>
<Link to="/login">Login</Link>
</div>


    )
  }
}
