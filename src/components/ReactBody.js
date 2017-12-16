import React from 'react';

import {Link, browserHistory} from 'react-router';
// import axios from '../axios';
// import {getSocket} from '../socket';

export class ReactBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div id='reactBody'>
    <header id='header'>
    <h1>Logo!</h1>
  {this.props.header}
  <h1>Buttons!</h1>
    </header>

      {this.props.main}

      <footer><h1>BADMAN</h1></footer>
</div>
    )
  }
}
