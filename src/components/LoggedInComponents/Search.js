import React from 'react';
import {connect} from 'react-redux';
import {searchUsers} from '../../actions';
import {Link} from 'react-router'

const mapStateToProps = state => ({
  error: state.error,
  userType: state.userType,
  userResults: state.userResults
});

const mapDispatchToProps = dispatch => ({
  searchUsers: payload => dispatch(searchUsers(payload))
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {})
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      searchTerm: this.state.searchBox,
      userType: this.props.userType
    };
    this.props.searchUsers(data);
  }

  render() {
    let userList = '';
    if (this.props.userResults) {
if(this.props.userType == 0) {

userList = this.props.userResults.map((user) => <div className='result' key={user.id}>
  <Link to={`/result/${user.id}`}><p>{user.fname}{user.lname}</p></Link>
<img src={user.image1} alt=""/>
{user.description && <p>About: {user.description}</p>}
{user.responsibilites && <p>Looking for: {user.responsibilites}</p> }
    </div>);

} else {
  userList = this.props.userResults.map((user) => <div className='result' key={user.id}>
  {user.title && <Link to={`/result/${user.id}`}><p>{user.title}</p></Link>}
    {!user.title && <Link to={`/result/${user.id}`}><p>View Profile</p></Link>}
    <img src={user.image1} alt=""/>
    {user.description && <p>About: {user.description}</p>}
  {user.responsibilites && <p>What you'll be doing: {user.responsibilites}</p> }



      </div>);
}
}








    return (<div className='main' id='search'>


    <h1>What are you looking for?</h1>
      <div>
      <input onChange={this.handleChange} name="searchBox" type="text"/>
      <button onClick={this.handleSubmit}>Search beacon</button>
  </div>
    {this.props.userResults && !this.props.error && <div id='searchResults'>{userList}</div>}
      {this.props.error && <p>{this.props.error}</p>}
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
