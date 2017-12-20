import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
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

  componentDidMount() {
    let id = this.props.params.id
    this.props.fetchOtherUserProfile(id)
  }

  render() {
    const charPlaceHolder = "https://s3.amazonaws.com/bucketoftheether/zPw8bZdswK-3M-7MW0QTbQN-L3LGSRyl.png"
    const volPlaceHolder = 'https://s3.amazonaws.com/bucketoftheether/8PkYpU3KqHK2uRegWmVQP0fr0196-OJK.png'
    console.log(this.props.OtherImage1);
    console.log('other profile props on render', this.props);
    let content;
    if (this.props.OtherUserType == 0) {
      content = <div className='main' id='otherProfile'>
        <h1>{this.props.OtherUserTitle}</h1>
        <div className='imageBox'>
          <div className='singleImage'>
            {charPlaceHolder != this.props.OtherImage1 && <img src={this.props.OtherImage1} alt=""/>}
          </div>
          <div className='singleImage'>
            {charPlaceHolder != this.props.OtherImage2 && <img src={this.props.OtherImage2} alt=""/>}
          </div>
          <div className='singleImage'>
        {charPlaceHolder != this.props.OtherImage3 && <img src={this.props.OtherImage3} alt=""/>}
          </div>
        </div>
        <div>
          <p>About:
            <h1>{this.props.OtherUserDescription}</h1>
          </p>
        </div>
        <div>
          <p>What you'll be doing:
          </p>
          <h1>{this.props.OtherUserResponsibilites}</h1>
        </div>
        <div>
          <p>looking for the following skills:
          </p>
          <h1>{this.props.OtherUserSkills}</h1>
        </div>
{(this.props.userType != this.props.OtherUserType) && <Link to={`/convo/${this.props.OtherUserId}`}>Send a Message!</Link>}
      </div>
    } else {
      content = <div className='otherProfile'>
        <div>
          <h1>{this.props.OtherUserFname}{this.props.OtherUserLname}</h1>
          <img src={this.props.OtherImage1} alt=""/></div>
        <div>
          <p>About me:
          </p>
          <h1>{this.props.OtherUserDescription}</h1>
        </div>
        <div>
          <p>I'm interested in:
          </p>
          <h1>{this.props.OtherUserResponsibilites}</h1>
        </div>
        <div>I'm good at:
          <h1>{this.props.OtherUserSkills}</h1>
        </div>
        {(this.props.userType != this.props.OtherUserType) && <Link to={`/convo/${this.props.OtherUserId}`}>Send a Message!</Link>}
{(this.props.userType != this.props.OtherUserType) && <Link to={`/convo/${this.props.OtherUserId}`}>Send a Message!</Link>}
      </div>
    }

    return (<div className='main' id='otherUser'>
      {content}

    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherUser);
