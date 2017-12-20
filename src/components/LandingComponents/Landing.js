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

<div className='main' id='landing'>
<h1>LOGO WILL GO HERE</h1>
<h1>Beacon connects volunteers with charities and non-profits across the world.</h1>
<h1>pictures go here</h1>
<div><Link to="/register">Register</Link> or <Link to="/login">Login</Link> to get started.</div>

</div>


    )
  }
}
