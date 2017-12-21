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

    <img id='smallLogo' src="/images/logoSmall.png" alt=""/>

    <p>Hi {this.props.userFname}</p>
    {location.pathname != '/' && <Link to='/'>Main Menu</Link>}
    <a href="/logout">Logout</a>

</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoggedIn);
