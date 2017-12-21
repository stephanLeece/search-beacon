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

<h1>What would you like to do?</h1>


<div id='homeMenu'>
{this.props.userType != 0 && <Link to='/map'><div><img className='homeIcon' src="/images/map.png" alt=""/><p>Check the map</p></div></Link>}
<Link to='/search'><div><img className='homeIcon' src="/images/search.png" alt=""/><p>Search</p></div></Link>
<Link to='/edit'><div><img className='homeIcon' src="/images/profile.png" alt=""/><p>Edit your profile</p></div></Link>
<Link to='/messages'><div><img className='homeIcon' src="/images/mail.png" alt=""/><p>Check messages</p></div></Link>
    </div>

  </div>)
  }
}

export default connect(mapStateToProps)(UserHome);
