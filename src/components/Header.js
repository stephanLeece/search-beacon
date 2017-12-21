import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, Link, IndexRoute, redirect, hashHistory, browserHistory} from 'react-router';

const mapStateToProps = state => ({
  userEmail: state.userEmail,
  userFname: state.userFname,
  userId: state.userId,
  userLname: state.userLname,
  userType: state.userType,
});


const mapDispatchToProps = dispatch => ({

});


export class HeaderLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div id='headerLanding'>

</div>
    )
  }
}


class HeaderLoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div id='headerLoggedin'>

      <Link id='smallLogo' to='/'><img src="/images/logoSmall.png" alt=""/></Link>

    <p>Hi {this.props.userFname} | </p>

    <a href="/logout">Logout</a>

</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoggedIn);
