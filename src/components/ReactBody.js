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
  {this.props.header}
    </header>

      {this.props.main}

      <footer><img id='footerLogo' src="/images/footerLogo.png" alt=""/></footer>
</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactBody);
