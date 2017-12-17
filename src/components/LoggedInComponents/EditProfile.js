import React from 'react';
import {connect} from 'react-redux';
import {submitPicture} from '../../actions';

const mapStateToProps = state => (
  {
    loggedInUserEmail: state.loggedInUserEmail,
    loggedInUserFname: state.loggedInUserFname,
    loggedInUserId: state.loggedInUserId,
    loggedInUserLname: state.loggedInUserLname,
    loggedInUsertype: state.loggedInUsertype,
    userImage1: state.image1,
    userImage2: state.image2,
    userImage3: state.image3,
  });

const mapDispatchToProps = dispatch => ({
  submitPicture: payload => dispatch(submitPicture(payload))
});

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPicture = this.handleSubmitPicture.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log('new state', this.state);
    })
  }

  handleCheckboxChange(event) {
    this.setState({
      [event.target.name]: event.target.checked
    }, () => {
      console.log('new state', this.state);
    })
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
    if (this.state.Teaching) {
      console.log('teaching');
    }
    // const {title, descrip, responsibilities} = this.state;
    // dispatch an action to post everything else
    // };
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

  render() {
    console.log('props', this.props);
    let usertype = this.props.loggedInUsertype;
    let form;
    if (usertype == 0) {
      form = <form className='beaconForm'>
        <label for="title">Title:</label>
        <input onChange={this.handleChange} type="text" name="title" value=""/>
        <label for="descrip">Description:</label>
        <textarea onChange={this.handleChange} name="descrip" rows="8" cols="80"></textarea>
        <label for="responsibilities">Responsibilities:</label>
        <textarea onChange={this.handleChange} name="responsibilities" rows="8" cols="80"></textarea>
        <label>Skills You're looking for:</label>
        <div class="fieldset">
          <label>
            <input type="checkbox" name="Teaching" onChange={this.handleCheckboxChange} defaultChecked={false}/>
            Teaching
          </label>
        </div>
        <h1>Add up to three images</h1>
        <div className='imageBox'>

        <div className='singleImage'>
        <img src={this.props.userImage1} alt=""/>
          <div className="fileContainer">
          Picture
            <input onChange={this.handleImageChange} name="image1" type="file"/>
          </div>
          <button name="image1b" onClick={this.handleSubmitPicture}>Add</button>
          </div>

            <div className='singleImage'>
            <img src={this.props.userImage2} alt=""/>
          <div className="fileContainer">
          Picture
            <input onChange={this.handleImageChange} name="image2" type="file"/>
          </div>
          <button name="image2b" onClick={this.handleSubmitPicture}>Add</button>
            </div>


          <div className='singleImage'>
          <img src={this.props.userImage3} alt=""/>
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
        <div className='imageBox'>
          <div className="fileContainer">
            <input onChange={this.handleImageChange} name="image1" type="file"></input>
          </div>
        </div>
        <button name="image1b" onClick={this.handleSubmitPicture}>Add</button>
        <label for="descrip">About you:</label>
        <textarea onChange={this.handleChange} name="descrip" rows="8" cols="80"></textarea>
        <label for="responsibilities">What you're looking for:</label>
        <textarea onChange={this.handleChange} name="responsibilities" rows="8" cols="80"></textarea>
        <label>Skills:</label>
        <div class="fieldset">
          <label>
            <input type="checkbox" name="Teaching" onChange={this.handleCheckboxChange} defaultChecked={false}/>
            Teaching
          </label>
        </div>
        <button onClick={this.handleSubmit}>Save Details</button>
      </form>
    }

    return (<div className='main'>
      {form}
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
