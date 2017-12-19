import React from 'react';
import {connect} from 'react-redux';
import AutoComplete from './AutoComplete'
import PlacesAutocomplete, {  geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {Helmet} from "react-helmet";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  fetchOtherUserProfile: payload => dispatch(fetchOtherUserProfile(payload))
});

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount() {
      let id = this.props.params.id
    this.props.fetchOtherUserProfile(id)
  }

  render() {


    return (<div className='main'>
    <Helmet>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYnCrdS4AwE6GbSG-jy-4hYB1ltz7t0UY&libraries=places"></script>
        </Helmet>
        <p>Current Address: {this.props.userAddress}</p>
        {!this.state.showAuto && <button onClick={this.toggleAuto}>toggleAuto</button>}
          {this.state.showAuto && <AutoComplete/>}
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
