import React from 'react';
import {connect} from 'react-redux';
import {fetchOtherUserProfile, propChange, getMessagesFromConvo, postMessage} from '../../actions';

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
  messages: state.messages,
  newMessage: state.newMessage
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
      message: this.props.newMessage,
      senderId: this.props.userId,
      senderfname: this.props.userFname,
      senderlname: this.props.userLname,
      receiverid: this.props.OtherUserId,
      receivierfname: this.props.OtherUserFname,
      receivierlname: this.props.OtherUserLname

    };
    this.props.postMessage(data);
  }

  componentDidMount() {
    let id = this.props.params.id
    this.props.fetchOtherUserProfile(id)
    this.props.getMessagesFromConvo(id)
  }

  componentDidUpdate() {
    this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
    this.textArea.value = '';
  }

  render() {
    const charPlaceHolder = "https://s3.amazonaws.com/bucketoftheether/zPw8bZdswK-3M-7MW0QTbQN-L3LGSRyl.png"

    const volPlaceHolder = 'https://s3.amazonaws.com/bucketoftheether/8PkYpU3KqHK2uRegWmVQP0fr0196-OJK.png'

    let messageList;
    if (this.props.messages) {
      messageList = this.props.messages.map((message) => <div className='message'>
    
        <h2>{message.senderfname} {message.senderlname}: {message.message}</h2>
      </div>);
    }

    return (<div className='main' id='convo'>
      <h2>Chat with {this.props.OtherUserFname}</h2>
      <div id='convoContents'>
      <div>
      {charPlaceHolder != this.props.OtherImage1 && volPlaceHolder != this.props.OtherImage1 && <img id='convoImage' src={this.props.OtherImage1} alt=""/>}
      <textarea ref={textArea => this.textArea = textArea} onChange={this.handleChange} name="newMessage" rows="8" cols="80" value={this.props.newMessage}/>
      <button onClick={this.handleSubmit}>Send</button>
      </div>
      <div>
        {!this.props.messages && <p>Why not say Hello?</p>}
        <div ref={elem => this.elem = elem} id='messageList'>{this.props.messages && messageList}</div>

      </div>
    </div>
  </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Convo);
