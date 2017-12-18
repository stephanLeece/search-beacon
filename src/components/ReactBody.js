import React from 'react';
import {connect} from 'react-redux';
import {fetchUserDetails} from '../actions';

const mapStateToProps = state => ({
  userEmail: state.userEmail,
  userFname: state.userFname,
  userId: state.userId,
  userLname: state.userLname,
  userType: state.userType,
});



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
    console.log('body props', this.props);
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
