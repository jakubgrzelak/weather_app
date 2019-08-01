import React, { Component } from 'react'
import Modal from 'react-modal';
import '../styles/components/OptionalCitiesModal.scss';
import Maps from './Maps';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

export default class OptionalCitiesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMap: false, 
      coord: {}
    }
  }
  render() {
    return (
      <Modal
        isOpen
        style={customStyles}
        contentLabel="Example Modal"
        onRequestClose={this.props.closeModal}
      >
        <div className="modal-content">
          { this.state.showMap && <Maps coord={this.state.coord} closeMap={this.closeMap} /> }
          <h5>We found more then one city which matches entered name. Pick one from the list below</h5>
          {this.renderCities()}
          <div className="button-container">
            <button onClick={this.props.closeModal} className='btn btn-warning'>Cancel</button>
          </div>
        </div>
      </Modal>
    );
  }

  showOnMap = coord => {
    this.setState({
      showMap: true, 
      coord,
    })
  }

  closeMap = () => {
    this.setState({
      showMap: false, 
      coord: {},
    })
  }

  onCityPress = (cityId) => {
    this.props.onCityClick(cityId);
    this.closeMap();
    this.props.closeModal();
  }

  renderCities = () => {
    return this.props.optionalCities.map((city, index ) => (
      <div key={index} className="city-row">
        <h6 onClick={() => this.onCityPress(city.id)}>
          {city.name}, {city.country}
        </h6>
        <div>
          <img 
            className="icon-world-map" 
            src={require('../assets/images/common/icon_world_map.png')}
            onClick={() => this.showOnMap(city.coord)}
            alt="world-map"
          />
        </div>
      </div>
    ));
  }
}
