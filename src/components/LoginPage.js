import React from 'react';
import {Link, browserHistory} from 'react-router';
// import axios from '../axios';
// import {getSocket} from '../socket';


export class LoginPage extends React.Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log('new state', this.state);
    })
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    console.log('rendered');
    return (
      <div id='UserRegister'>
      <form className='beaconForm' onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input onChange={this.handleChange} name="email" type="text"/>
        </label>
        <label>
          Password:
          <input onChange={this.handleChange} name="pWord" type="text"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}
