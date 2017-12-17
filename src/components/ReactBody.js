import React from 'react';
import {connect} from 'react-redux';
import {fetchUserDetails} from '../actions';

const mapStateToProps = state => ({loggedInUserEmail: state.loggedInUserEmail, loggedInUserFname: state.loggedInUserFname, loggedInUserId: state.loggedInUserId, loggedInUserLname: state.loggedInUserLname, loggedInUsertype: state.loggedInUsertype});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: payload => dispatch(fetchUserDetails(payload))
});

class ReactBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
        this.props.fetchUserDetails()
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactBody);
