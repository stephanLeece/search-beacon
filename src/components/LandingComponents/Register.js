import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {postRegisterForm} from '../../actions';

const mapStateToProps = state => ({error: state.error});

const mapDispatchToProps = dispatch => ({
  postForm: payload => dispatch(postRegisterForm(payload))
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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
    const {fname, lname, email, pword, usertype} = this.state;
    const data = {
      fname,
      lname,
      email,
      pword,
      usertype
    };
    this.props.postForm(data)
  }

  render() {
    console.log('rendered', this.props);
    return (<div id='register'>

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
          <input onChange={this.handleChange} name="pword" type="password"/>
        </label>
        <label>
          Register as:
          <input onChange={this.handleChange} type="radio" name="usertype" value="0"/>
          Charity
          <input onChange={this.handleChange} type="radio" name="usertype" value="1"/>
          Volunteerd
        </label>
        <input type="submit" value="Submit"/>
      </form>
      {this.props.error && <p>{this.props.error}</p>}
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
