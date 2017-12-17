import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({loggedInUserEmail: state.loggedInUserEmail, loggedInUserFname: state.loggedInUserFname, loggedInUserId: state.loggedInUserId, loggedInUserLname: state.loggedInUserLname, loggedInUsertype: state.loggedInUsertype});

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    // const {email, pword} = this.state;
  // dispatch an action to post everything else
    // };
  }

  handleSubmitPicture(event) {
    event.preventDefault();
    // dispatch an action to post request for images
    // const {email, pword} = this.state;
    // const data = {
    //   email,
    //   pword
    // };
  }



  // checkBox(event){
  //      console.log(event.target.checked, event.target.name);
  //  };

  render() {
    console.log(this.props);
    let usertype = this.props.loggedInUsertype;
    let form;
    if (usertype == 1) {
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
          <div className="fileContainer">
            <input onChange={this.handleChange} name="image1" type="file"/>
          </div>
          <button onClick={this.handleSubmitPicture}>Add</button>
          <div className="fileContainer">
            <input onChange={this.handleChange} name="image2" type="file"/>
          </div>
          <button onClick={this.handleSubmitPicture}>Add</button>
          <div className="fileContainer">
            <input onChange={this.handleChange} name="image3" type="file"/>
          </div>
          <button onClick={this.handleSubmitPicture}>Add</button>
        </div>
        <button onClick={this.handleSubmit}>Save Details</button>
      </form>

    } else {
      form = <form className='beaconForm'>
        <h1>Add a profile picture</h1>
        <div className='imageBox'>
          <div className="fileContainer">
            <input onChange={this.handleChange} name="image1" type="file"></input>
          </div>
        </div>
        <button onClick={this.handleSubmitPicture}>Add</button>
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

export default connect(mapStateToProps)(EditProfile);
