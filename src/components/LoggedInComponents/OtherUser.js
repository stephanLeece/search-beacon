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

class OtherUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount() {
    let id = this.props.params.id
    this.props.fetchOtherUserProfile(id)

  }

  render() {
      console.log('other profile props on render', this.props);
    let userType = this.props.OtherUserType;
    let content;
    if (userType == 0) {
      content = <div className='otherProfile'>
<h1>Charity</h1>
<h1>{this.props.OtherUserTitle}</h1>
<h1>{this.props.OtherUserDescription}</h1>
<h1>{this.props.OtherUserResponsibilites}</h1>
<h1>{this.props.OtherUserSkills}</h1>
<h1>{this.props.OtherUserTitle}</h1>
<img src={this.props.OtherImage1} alt=""/>
<img src={this.props.OtherImage2} alt=""/>
<img src={this.props.OtherImage3} alt=""/>
      </div>
    } else {
      content = <div className='otherProfile'>
      <h1>User</h1>
      <h1>{this.props.OtherUserFname}</h1>
      <h1>{this.props.OtherUserLname}</h1>
      <img src={this.props.OtherImage1} alt=""/>
      <h1>{this.props.OtherUserDescription}</h1>
      <h1>{this.props.OtherUserResponsibilites}</h1>
      <h1>{this.props.OtherUserSkills}</h1>
      <h1>{this.props.OtherUserTitle}</h1>
      </div>
    }

    return (<div className='main'>
      {content}
      {(this.props.userType != this.props.OtherUserType) && <h1>Different!</h1>}
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherUser);
