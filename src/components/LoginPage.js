import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {postLoginForm} from '../actions';

const mapStateToProps = state => ({error: state.error});

const mapDispatchToProps = dispatch => ({
  postLoginForm: payload => dispatch(postLoginForm(payload))
});

class LoginPage extends React.Component {
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
    const {email, pword} = this.state;
    const data = {
      email,
      pword
    };
    this.props.postLoginForm(data).then(function() {
      location.replace('/');
    })
  }

  render() {
    console.log('rendered');
    return (
      <div id='login'>
      <form className='beaconForm' onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input onChange={this.handleChange} name="email" type="text"/>
        </label>
        <label>
          Password:
          <input onChange={this.handleChange} name="pword" type="password"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
