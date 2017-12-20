import React from 'react';
import {connect} from 'react-redux';
import {postLoginForm, propChange} from '../actions';

const mapStateToProps = state => ({error: state.error});

const mapDispatchToProps = dispatch => ({
  postLoginForm: payload => dispatch(postLoginForm(payload)),
    propChange: payload => dispatch(propChange(payload))
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

    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email, pword} = this.state;
    const data = {
      email,
      pword
    };
    this.props.postLoginForm(data);
  }

  componentDidMount() {
    let data = {
      name: 'error',
      value: false
    }
    this.props.propChange(data)
  }

  render() {

    return (
      <div className='main' id='loginPage'>
      <h1>Almost there!</h1>
      <form className='beaconForm'>
        <label>
          Email:
          <input onChange={this.handleChange} name="email" type="text"/>
        </label>
        <label>
          Password:
          <input onChange={this.handleChange} name="pword" type="password"/>
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
            {this.props.error && <p>{this.props.error}</p>}
      </form>

      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
