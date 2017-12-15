import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {postForm} from '../../actions';
// import {Link, browserHistory} from 'react-router';
// import axios from '../axios';
// import {getSocket} from '../socket';
const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  postForm: (payload) => dispatch(postForm(payload)),
});

class Register extends React.Component {
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
    const {fname, lname, email, pword, userType} = this.state;
const registerData = {
  fname,
  lname,
  email,
  pword,
  userType
};
this.props.postForm(registerData)
  }

  render() {
    console.log('rendered');
    return (
      <div id='register'>
      <form className='beaconForm' onSubmit={this.handleSubmit}>
      <label>
        First Name:
        <input onChange={this.handleChange} name="fname" type="text"/>
      </label>
      <label>
        Surname:
        <input onChange={this.handleChange} name="lname" type="text"/>
      </label>
      <label>
        Email:
        <input onChange={this.handleChange} name="email" type="text"/>
      </label>
      <label>
        Password:
        <input onChange={this.handleChange} name="pWord" type="text"/>
      </label>
      <label>
        Register as:
        <input onChange={this.handleChange} type="radio" name="userType" value="Volunteer"/>
        Volunteer
 <input onChange={this.handleChange} type="radio" name="userType" value="Charity"/>
 Charity
      </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
