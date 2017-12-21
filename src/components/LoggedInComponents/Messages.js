import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {getReceived, getSent} from '../../actions';

const mapStateToProps = state => ({
  userEmail: state.userEmail,
  userFname: state.userFname,
  userId: state.userId,
  userLname: state.userLname,
  userType: state.userType,
  image1: state.image1,
  image2: state.image2,
  image3: state.image3,
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
  allMessages: state.allMessages,
  showingSent: state.showingSent,
  showingRecevied: state.showingRecevied,
  messageError: state.messageError
});

const mapDispatchToProps = dispatch => ({
  getReceived: payload => dispatch(getReceived(payload)),
  getSent: payload => dispatch(getSent(payload))
});

class Messages extends React.Component {
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
  }

  componentDidMount() {

  }

  render() {

    let messageList;
    if (this.props.showingSent && this.props.allMessages) {
      messageList = this.props.allMessages.map((message) => <div className ='message'> <Link to={`/convo/${message.receiverid}`}>
        <p>Message to: {message.receivierfname}{message.receivierlname}</p><h2>{message.message}</h2>
      </Link></div>)
    } else if (this.props.showingRecevied && this.props.allMessages) {
      messageList = this.props.allMessages.map((message) => <div className ='message'><Link to={`/convo/${message.senderid}`}>
    <p>Message to: {message.receivierfname}{message.receivierlname}</p><h2>{message.message}</h2>
      </Link></div>)
    }

    return (<div className='main' id='messages'>
      <h1>Your Messages</h1>

      <div>
      <button type='button' onClick={this.props.getSent}>Show Sent</button>
      <button type='button' onClick={this.props.getReceived}>Show Received</button>
      </div>
        <div><div id='messageList'>{messageList}</div> {!messageList && this.props.messageError && <p>No Messages yet...</p>}</div>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
