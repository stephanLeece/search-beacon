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

    return (<div className='main' id='search'>

    <label>
      Search by skill:
      <input onChange={this.handleChange} name="searchBox" type="text"/>
      <button onClick={this.handleSubmit}>Submit</button>
    </label>
      {this.props.error && <p>{this.props.error}</p>}
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
