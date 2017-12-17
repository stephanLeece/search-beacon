import React from 'react';
import {connect} from 'react-redux';


const mapStateToProps = state => ({loggedInUserEmail: state.loggedInUserEmail, loggedInUserFname: state.loggedInUserFname, loggedInUserId: state.loggedInUserId, loggedInUserLname: state.loggedInUserLname, loggedInUsertype: state.loggedInUsertype});


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }




  render() {
console.log(this.props);


    return (<div className='main' >
    <select name="travel_arriveVia" id="travel_arriveVia" onchange="showfield(this.options[this.selectedIndex].value)">
    <option selected="selected">Please select ...</option>
    <option value="Plane">Plane</option>
    <option value="Train">Train</option>
    <option value="Own Vehicle">Own Vehicle</option>
    <option value="Other">Other</option>
    </select>
    <div id="div1"></div>




    <form >
    <label for="title">Title</label>
    <input type="text" name="title" value=""/>

    <label for="descrip">descrip</label>
    <textarea name="descrip" rows="8" cols="80"></textarea>

    <label>Choose your interests</label>
    <div class="fieldset">




      <div>
        <input type="checkbox" id="coding" name="interest" value="coding"/>
        <label for="coding">Coding</label>
      </div>
      <div>
        <input type="checkbox" id="coding" name="interest" value="coding"/>
        <label for="coding">Coding</label>
      </div>
      <div>
        <input type="checkbox" id="coding" name="interest" value="coding"/>
        <label for="coding">Coding</label>
      </div>
      <div>
        <input type="checkbox" id="coding" name="interest" value="coding"/>
        <label for="coding">Coding</label>
      </div>
      <div>
        <input type="checkbox" id="coding" name="interest" value="coding"/>
        <label for="coding">Coding</label>
      </div>
      <div>
        <input type="checkbox" id="coding" name="interest" value="coding"/>
        <label for="coding">Coding</label>
      </div>
      <div>
        <input type="checkbox" id="coding" name="interest" value="coding"/>
        <label for="coding">Coding</label>
      </div>
      <div>
        <input type="checkbox" id="music" name="interest" value="music"/>
        <label for="music">Music</label>
      </div>

    </div>
    <label for="coding">Choose up to three images</label>
    <input type="file" name="" value=""/>
      </form>
    </div>)
  }
}

export default connect(mapStateToProps)(EditProfile);
