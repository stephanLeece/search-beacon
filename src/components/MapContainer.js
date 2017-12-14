import React, {PropTypes} from "react"
import {Link, browserHistory} from 'react-router';
import axios from '../axios';
import {getSocket} from '../socket';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: {}
    };
  }

  render() {
    console.log('rendering');
    const style = {
      width: '100vw',
      height: '100vh',
      border: '1px solid yellow'
    }
    return (
      <Map google={this.props.google} style={style} />    );

  }
}

export default GoogleApiWrapper({apiKey: ("AIzaSyCYnCrdS4AwE6GbSG-jy-4hYB1ltz7t0UY")})(MapContainer)
