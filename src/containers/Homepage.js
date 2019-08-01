import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import CityForm from '../components/CityForm';
import LoadAnimation from '../components/LoadingAnimation/index';
import '../styles/cover.scss'
import WeatherInfoTable from '../components/WeatherInfoTable';

import { 
  optionalCitiesSelector, 
  fetchingCitiesSelector, 
  oneCityWeatherSelector, 
  rememberCitySelector, 
  recentChecksSelector
} from '../selectors/citySelector';

import { city } from '../actions'
import WithErrors from '../hocs/WithErrors'
import OptionalCitiesModal from '../components/OptionalCitiesModal';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCitiesModal: false, 
      shouldRememberCity: props.rememberCityData ? true : false,
    }
  }

  static propTypes = {
    fetching: PropTypes.bool,
  };

  static defaultProps = {
    fetching: false,
  };

  static getDerivedStateFromProps(props, state) {
    if( props.rememberCityData && props.oneCityWeather) {
      if (props.rememberCityData.city.id !== props.oneCityWeather.city.id) {
        return {
          ...state,
          shouldRememberCity: false,
        }
      }
    }
    if (props.rememberCityData) {
      return {
        ...state,
        shouldRememberCity: true
      }
    }
    if (!props.rememberCityData) {
      return {
        ...state,
        shouldRememberCity: false
      }
    }
  }

  render() {
    return (
      <div className="text-center">
        { this.props.fetching && <LoadAnimation /> }
        <div className="cover-container">
          <main role="main" className="inner cover">
            {this.renderCorrectHeaderInfo()}
            <CityForm 
              saveOptionalCities={this.props.saveOptionalCities}
              showCitiesModal={this.showCitiesModal}
              isCityChoosen={this.isCityChoosen()}
              onCityClick={this.onCityClick}
            />
            {
              (this.props.oneCityWeather || this.props.rememberCityData) && 
                <WeatherInfoTable 
                  oneCityWeather={this.props.oneCityWeather}
                  rememberCityData={this.props.rememberCityData}
                  shouldRememberCity={this.state.shouldRememberCity}
                  recentChecksData={this.props.recentChecksData}
                  rememberCity={this.rememberCity}
                  onCityClick={this.onCityClick}
                />
            }
          </main>
          { this.state.showCitiesModal && 
              <OptionalCitiesModal               
                closeModal={this.closeCitiesModal}
                optionalCities={this.props.optionalCities} 
                onCityClick={this.onCityClick}
              /> 
          }
        </div>
      </div>
    )
  }

  rememberCity = (city) => {
    if (this.state.shouldRememberCity === true) {
      this.setState({ shouldRememberCity: false})
      this.props.rememberCity(null)
    } else {
      this.setState({ shouldRememberCity: true });
      this.props.rememberCity(city);
    }
  }


  isCityChoosen = () => {
    if ((!!this.props.oneCityWeather === true) || (!!this.props.rememberCityData === true)) {
      return true;
    } else {
      return false;
    }
  }

  renderCorrectHeaderInfo = () => {
    if (!this.props.rememberCityData && !this.props.oneCityWeather ) {
      return (
        <div className="cover-text-container">
          <h1 className="cover-heading">Are you curious what is the weather like?</h1>
          <p className="lead">
            Find your desired city and check if it is worth to come out or to stay at home with a cup of hot tea.
          </p>
        </div>
      )
    }
    return(
      <div className="cover-text-container">
        <p className="lead lead-without-margin">
          Find different city.
        </p>
      </div> 
    );
  }

  onCityClick = (id) => {
    let elementExistInRecentChecks;
    if (this.props.recentChecksData) {
      elementExistInRecentChecks = this.props.recentChecksData.find(element => element.city.id === id) 
    }
    this.props.oneCityWeatherRequest({ id, elementExistInRecentChecks: !!elementExistInRecentChecks });
  }
  showCitiesModal = () => this.setState({ showCitiesModal: true });
  closeCitiesModal = () => this.setState({ showCitiesModal: false });
}

const mapStateToProps = createStructuredSelector({
  optionalCities: optionalCitiesSelector(),
  fetching: fetchingCitiesSelector(),
  oneCityWeather: oneCityWeatherSelector(),
  rememberCityData: rememberCitySelector(),
  recentChecksData: recentChecksSelector(),
})

const mapDispatchToProps = {
  saveOptionalCities: city.saveOptionalCities,
  oneCityWeatherRequest: city.oneCityWeatherRequest,
  rememberCity: city.rememberCity,
  saveOneCityWeather: city.oneCityWeatherSuccess
}

export default compose(
  WithErrors,
  connect(mapStateToProps, mapDispatchToProps),
)(Homepage)
