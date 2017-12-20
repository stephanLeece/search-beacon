import React from 'react';
import {connect} from 'react-redux';
import AutoComplete from './AutoComplete'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {Helmet} from "react-helmet";
import {submitPicture, saveProfile, fetchUserProfile, propChange} from '../../actions';

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
  image1: state.image1,
  image2: state.image2,
  image3: state.image3,
  address: state.address,
  profileSaved: state.profileSaved,
  userAddress: state.userAddress
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
    this.handleUpdateAddress = this.handleUpdateAddress.bind(this);
    this.toggleAuto = this.toggleAuto.bind(this);

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
    this.props.propChange(data)
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

  handleUpdateAddress() {
    console.log('update');
  }

  toggleAuto() {
    this.setState({
      showAuto: !this.state.showAuto
    })
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
      form = <form className='profileForm'>
        <label for="title">Name of Organisation:</label>
        <input onChange={this.handleChange} type="text" name="userTitle" value={this.props.userTitle}/>

        <div className='addressBox'>
          {!this.state.showAuto && <div><p>Location: {this.props.userAddress}</p> <button type='button' onClick={this.toggleAuto}>Update</button></div>}
          {this.state.showAuto && <AutoComplete/>}
        </div>
        <label for="description">Tell the world about your Organisation:</label>
        <textarea onChange={this.handleChange} name="userDescription" rows="8" cols="80" value={this.props.userDescription}/>
        <label for="responsibilities">What will volunteers be doing?:</label>
        <textarea onChange={this.handleChange} name="userResponsibilites" rows="8" cols="80" value={this.props.userResponsibilites}/>
        <label>Skills You're looking for (single words, seperated by a space please! e.g teaching painting etc)</label>
        <textarea onChange={this.handleChange} name="userSkills" rows="8" cols="80" value={this.props.userSkills}/>
        <p>Add up to three images</p>

        <div className='imageBox'>

          <div className='singleImage'>
            <img src={this.props.image1} alt=""/>
            <div>
              <div className="fileContainer">
                Change
                <input onChange={this.handleImageChange} name="image1" type="file"/>
              </div>
              <button name="image1b" onClick={this.handleSubmitPicture}>Save</button>
            </div>
          </div>

          <div className='singleImage'>
            <img src={this.props.image2} alt=""/>
            <div>
              <div className="fileContainer">
                Change
                <input onChange={this.handleImageChange} name="image2" type="file"/>
              </div>
              <button name="image2b" onClick={this.handleSubmitPicture}>Save</button>
            </div>
          </div>

          <div className='singleImage'>
            <img src={this.props.image3} alt=""/>
            <div>
              <div className="fileContainer">
                Change
                <input onChange={this.handleImageChange} name="image3" type="file"/>
              </div>
              <button name="image3b" onClick={this.handleSubmitPicture}>Save</button>
            </div>
          </div>
        </div>
        {!this.props.profileSaved && <button onClick={this.handleSubmit}>Save Details</button>}
        {this.props.profileSaved && <button onClick={this.handleSubmit}>Saved!</button>}
      </form>

    } else {
      form = <form className='profileForm'>
        <div className='singleImage'>
          <img src={this.props.image1} alt=""/>
          <div>
            <div className="fileContainer">
              Change Profile Picture
              <input onChange={this.handleImageChange} name="image1" type="file"/>
            </div>
            <button name="image1b" onClick={this.handleSubmitPicture}>Save</button>
          </div>
        </div>
        <label for="description">Tell the world about yourself:</label>
        <textarea onChange={this.handleChange} name="userDescription" rows="8" cols="80" value={this.props.userDescription}/>
        <label for="responsibilities">What are you looking to do:</label>
        <textarea onChange={this.handleChange} name="userResponsibilites" rows="8" cols="80" value={this.props.userResponsibilites}/>
        <label>What are you good at? (single words, seperated by a space please! e.g teaching painting etc)</label>
        <textarea onChange={this.handleChange} name="userSkills" rows="8" cols="80" value={this.props.userSkills}/>
          {!this.props.profileSaved && <button onClick={this.handleSubmit}>Save Details</button>}
          {this.props.profileSaved && <button onClick={this.handleSubmit}>Saved!</button>}
      </form>
    }

    return (<div className='main' id='editProfile'>
      <Helmet>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYnCrdS4AwE6GbSG-jy-4hYB1ltz7t0UY&libraries=places"></script>
      </Helmet>

      {form}

    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
