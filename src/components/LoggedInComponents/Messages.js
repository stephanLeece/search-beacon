import React from 'react';
import {connect} from 'react-redux';
import {fetchOtherUserProfile} from '../../actions';

const mapStateToProps = state => ({
  userEmail: state.userEmail,
  userFname: state.userFname,
  userId: state.userId,
  userLname: state.userLname,
  userType: state.userType,
  OtherUserType: state.OtherUserType,
  OtherUserTitle: state.OtherUserTitle,
  OtherUserDescription: state.OtherUserDescription,
  OtherUserResponsibilites: state.OtherUserResponsibilites,
  OtherUserSkills: state.OtherUserSkills,
  OtherImage1: state.OtherImage1,
  OtherImage2: state.OtherImage2,
  OtherImage3: state.OtherImage3,
  OtherUserId: state.OtherUserId,
  OtherUserFname: state.OtherUserFname,
  OtherUserLname: state.OtherUserLname
});

const mapDispatchToProps = dispatch => ({
  fetchOtherUserProfile: payload => dispatch(fetchOtherUserProfile(payload))
});

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
      let id = this.props.params.id
    this.props.fetchOtherUserProfile(id)
  }

  render() {


    return (<div className='main'>
    <h1>Messages!</h1>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
