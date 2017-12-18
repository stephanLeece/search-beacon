import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {fetchUserDetails} from '../../actions';


const mapStateToProps = state => ({
  userEmail: state.userEmail,
  userFname: state.userFname,
  userId: state.userId,
  userLname: state.userLname,
  userType: state.userType,
});


class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }




  render() {
    console.log(this.props);
    let usertype = this.props.userType;
    let message;
     if (usertype == 0) {
       message = <h1>hello charity</h1>;
     } else {
     message = <h1>hello user</h1>;
     }

    return (<div className='main' id='UserHome'>
{message}
from here you can check the map <Link to='/search'>search</Link>,<Link to='/edit'>edit your profile</Link>, check messages.
    </div>)
  }
}

export default connect(mapStateToProps)(UserHome);
