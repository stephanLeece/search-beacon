import React from 'react';
import {connect} from 'react-redux';
import {searchUsers} from '../../actions';

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

userList = this.props.userResults.map((user) => <div key={user.id}>
<p>{user.fname}{user.lname}</p>
<img src={user.image1} alt=""/>
<p>{user.skills}</p>
    </div>);
} else {
  userList = this.props.userResults.map((user) => <div key={user.id}>
  <p>{user.title}</p>
  <img src={user.image1} alt=""/>
  <p>{user.skills}</p>
      </div>);
}
}



    return (<div className='main' id='search'>

    <label>
    <h1>What are you looking for?</h1>
      Search Beacon:
      <input onChange={this.handleChange} name="searchBox" type="text"/>
      <button onClick={this.handleSubmit}>Go</button>
    </label>
    {this.props.userResults && !this.props.error && <div>{userList}</div>}
      {this.props.error && <p>{this.props.error}</p>}
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
