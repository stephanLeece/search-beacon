import React from 'react';
// import {Link, browserHistory} from 'react-router';
// import axios from '../axios';
// import {getSocket} from '../socket';

export class HeaderLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div id='headerLanding'>

<h1>header landing!</h1>

</div>
    )
  }
}


export class HeaderLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div id='headerLoggedin'>

<h1>header logged in</h1>
<a href="/logout">Logout</a>
</div>
    )
  }
}
