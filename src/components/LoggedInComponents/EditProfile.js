import React from 'react';
import {connect} from 'react-redux';
import {submitPicture, saveProfile, fetchUserProfile, propChange} from '../../actions';
import AutoComplete from './AutoComplete'
import PlacesAutocomplete, {  geocodeByAddress, getLatLng } from 'react-places-autocomplete'


const mapStateToProps = state => ({
  userEmail: state.userEmail,
  userFname: state.userFname,
  userId: state.userId,
  userLname: state.userLname,
  userType: state.userType,
  userTitle: state.userTitle,
  userDescription: state.userDescription,
  userResponsibilites: state.userResponsibilites,
  userSkills: state.userSkills,
  image1: state.userImage1,
  image2: state.userImage2,
  image3: state.userImage3,
  profileSaved: state.profileSaved,
  userAddress: state.address,
  userLat: state.lat,
  userLng: state.lng
});

const mapDispatchToProps = dispatch => ({
  submitPicture: payload => dispatch(submitPicture(payload)),
  saveProfile: payload => dispatch(saveProfile(payload)),
  fetchUserProfile: payload => dispatch(fetchUserProfile(payload)),
  propChange: payload => dispatch(propChange(payload))
});

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPicture = this.handleSubmitPicture.bind(this);

  }

  // handleChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   }, () => {
  //     console.log('new state', this.state);
  //   })
  // }

  handleChange(e) {
    let data = {
      name: e.target.name,
      value: e.target.value
    }
    this.props.propChange(data);
    console.log('new state', this.state);
  }

  handleImageChange(e) {
    this.setState({
      [e.target.name]: e.target.files[0]

    }, () => {
      console.log('new state', this.state);
    })
  }



  handleSubmit(event) {
    event.preventDefault();
    const {userTitle, userDescription, userResponsibilites, userSkills} = this.props;
    const data = {
      userTitle,
      userDescription,
      userResponsibilites,
      userSkills
    };
    this.props.saveProfile(data);
  }

  handleSubmitPicture(event) {
    let imageNo = event.target.name
    event.preventDefault();
    let data = new FormData();
    if (imageNo == 'image1b') {
      data.append('image', this.state.image1);
      data.append('imageNo', `image1`);
    } else if (imageNo == 'image2b') {
      data.append('image', this.state.image2);
      data.append('imageNo', `image2`);
    } else {
      data.append('image', this.state.image3);
      data.append('imageNo', `image3`);
    }
    this.props.submitPicture(data);
  }

  componentDidMount() {
    this.props.fetchUserProfile()
    console.log('profile props on mount', this.props);
  }

  render() {
    console.log('profile props', this.props);
    let userType = this.props.userType;
    let form;
    if (userType == 0) {
      form = <form className='beaconForm'>
        <label for="title">Title:</label>
        <input onChange={this.handleChange} type="text" name="userTitle" value={this.props.userTitle}/>
        <label for="description">Description:</label>
        <textarea onChange={this.handleChange} name="userDescription" rows="8" cols="80"value={this.props.userDescription}/>
        <label for="responsibilities">Responsibilities:</label>
        <textarea onChange={this.handleChange} name="userResponsibilites" rows="8" cols="80"value={this.props.userResponsibilites}/>
        <label>Skills You're looking for:</label>
        <textarea onChange={this.handleChange} name="userSkills" rows="8" cols="80"value={this.props.userSkills}/>
        <h1>Add up to three images</h1>
        <div className='imageBox'>

          <div className='singleImage'>
            <img src={this.props.image1} alt=""/>
            <div className="fileContainer">
              Picture
              <input onChange={this.handleImageChange} name="image1" type="file"/>
            </div>
            <button name="image1b" onClick={this.handleSubmitPicture}>Add</button>
          </div>

          <div className='singleImage'>
            <img src={this.props.image2} alt=""/>
            <div className="fileContainer">
              Picture
              <input onChange={this.handleImageChange} name="image2" type="file"/>
            </div>
            <button name="image2b" onClick={this.handleSubmitPicture}>Add</button>
          </div>

          <div className='singleImage'>
            <img src={this.props.image3} alt=""/>
            <div className="fileContainer">
              Picture
              <input onChange={this.handleImageChange} name="image3" type="file"/>
            </div>
            <button name="image3b" onClick={this.handleSubmitPicture}>Add</button>
          </div>

        </div>
        <button onClick={this.handleSubmit}>Save Details</button>
      </form>

    } else {
      form = <form className='beaconForm'>
        <h1>Add a profile picture</h1>
        <div className='singleImage'>
          <img src={this.props.image1} alt=""/>
          <div className="fileContainer">
            Picture
            <input onChange={this.handleImageChange} name="image1" type="file"/>
          </div>
          <button name="image1b" onClick={this.handleSubmitPicture}>Add</button>
        </div>
        <label for="description">About you:</label>
        <textarea onChange={this.handleChange} name="userDescription" rows="8" cols="80" value={this.props.userDescription}/>
        <label for="responsibilities">What you're looking for:</label>
        <textarea onChange={this.handleChange} name="userResponsibilites" rows="8" cols="80" value={this.props.userResponsibilites}/>
        <label>Skills:</label>
        <textarea onChange={this.handleChange} name="userSkills" rows="8" cols="80" value={this.props.userSkills}/>
        <button onClick={this.handleSubmit}>Save Details</button>
      </form>
    }

    return (<div className='main'>
      {this.props.profileSaved && <h1>Profile Saved</h1>}
      {form}
      <AutoComplete/>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
