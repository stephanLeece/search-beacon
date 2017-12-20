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

    return (<div className='main' id='UserHome'>
{this.props.userType==0 && <h1>Hi {this.props.userLname}</h1>}
{this.props.userType==1 && <h1>Hi {this.props.userFname}</h1>}
from here you can:
{this.props.userType != 0 && <Link to='/map'>check the map</Link>}
<Link to='/search'>search</Link>
<Link to='/edit'>edit your profile</Link>
<Link to='/messages'>check messages</Link>.
    </div>)
  }
}

export default connect(mapStateToProps)(UserHome);
