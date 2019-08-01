import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../styles/components/MapStyles.scss'

export class MapContainer extends Component {
  render() {
    return (
      <div>
        <div className="close-button-container">
          <span className="close-button" onClick={this.props.closeMap}>X</span>
        </div>
        <Map 
          google={this.props.google} 
          zoom={6}
          initialCenter={{
            lat: this.props.coord.lat,
            lng: this.props.coord.lon,
          }}
          style={{height: '95%'}}
          center={{
            lat: this.props.coord.lat,
            lng: this.props.coord.lon,
          }}
        >
            <Marker 
              name="Your city"
              position={{
                lat: this.props.coord.lat,
                lng: this.props.coord.lon,
              }}
            />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCHUKV2NmkjYZadrjltp8xn_ABZLNqMgCY'
})(MapContainer)