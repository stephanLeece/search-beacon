import React from 'react';
import {Header} from './Header';
import {Link, browserHistory} from 'react-router';
// import axios from '../axios';
// import {getSocket} from '../socket';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div id='reactBody'>

{this.props.children}


</div>
    )
  }
}
