import React from 'react';
import {connect} from 'react-redux';
import {fetchOtherUserProfile, propChange, getMessagesFromConvo, postMessage} from '../../actions';

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
  OtherUserLname: state.OtherUserLname,
  message: state.message
});

const mapDispatchToProps = dispatch => ({
  fetchOtherUserProfile: payload => dispatch(fetchOtherUserProfile(payload)),
  propChange: payload => dispatch(propChange(payload)),
  getMessagesFromConvo: payload => dispatch(getMessagesFromConvo(payload)),
  postMessage: payload => dispatch(postMessage(payload))
});

class Convo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let data = {
      name: e.target.name,
      value: e.target.value
    }
    this.props.propChange(data);
    console.log('new props', this.props);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      message: this.props.message,
      senderId: this.props.userId,
      recevierId: this.props.OtherUserId
    };
    console.log(data);
  }

  componentDidMount() {
    let id = this.props.params.id
    this.props.fetchOtherUserProfile(id)
  }

  render() {

    return (<div className='main'>
      <h1>A convo!</h1>
      <div>Messages</div>
      <textarea onChange={this.handleChange} name="message" rows="8" cols="80" value={this.props.message}/>
      <button onClick={this.handleSubmit}>Send</button>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Convo);