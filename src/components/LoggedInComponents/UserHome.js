import React from 'react';
import {connect} from 'react-redux';
import {fetchUserDetails} from '../../actions';


const mapStateToProps = state => ({loggedInUserEmail: state.loggedInUserEmail, loggedInUserFname: state.loggedInUserFname, loggedInUserId: state.loggedInUserId, loggedInUserLname: state.loggedInUserLname, loggedInUsertype: state.loggedInUsertype});



class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }




  render() {
    console.log(this.props);
    let usertype = this.props.loggedInUsertype;
    let message;
     if (usertype == 0) {
       message = <h1>hello charity</h1>;
     } else {
     message = <h1>hello user</h1>;
     }

    return (<div className='main' id='UserHome'>
{message}
<h1>from here you can search, edit your profile, send or receive messages</h1>
    </div>)
  }
}

export default connect(mapStateToProps)(UserHome);
