import React from 'react';
import {connect} from 'react-redux';
import {getAllCharities} from '../../actions';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const mapStateToProps = state => ({error: state.error, userType: state.userType, charities: state.charities});

const mapDispatchToProps = dispatch => ({
  getAllCharities: payload => dispatch(getAllCharities(payload))
});

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker, e) {
    console.log('marker clicked');
    this.setState({selectedPlace: props, activeMarker: marker, showingInfoWindow: true});
  }

  onMapClicked(props) {
     if (this.state.showingInfoWindow) {
       this.setState({
         showingInfoWindow: false,
         activeMarker: null
       })
     }
   }

  componentDidMount() {
    this.props.getAllCharities()
  }

  render() {
    console.log('charities on render', this.props.charities);
let charities;
    if (this.props.charities) {
      charities = this.props.charities.map(charity =>
        <Marker onClick={this.onMarkerClick} name={charity.fname} position={{
              lat: charity.lat,
              lng: charity.lng
            }}/>
    );
      console.log('charities mapped', charities);
    }

    // let marker = <Marker onClick={this.onMarkerClick} name={'SOMA'} position={{
    //       lat: 37.778519,
    //       lng: -122.405640
    //     }}/>

//

    const style = {
      width: '50vw',
      height: '100vh',
      border: '1px solid yellow'
    }
    return (<Map google={this.props.google} style={style} onClick={this.onMapClicked}>
      {charities}
      <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
        <h1>{this.state.selectedPlace.name}</h1>
      </InfoWindow>
    </Map>);

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({apiKey: ("AIzaSyCYnCrdS4AwE6GbSG-jy-4hYB1ltz7t0UY")})(MapContainer));
