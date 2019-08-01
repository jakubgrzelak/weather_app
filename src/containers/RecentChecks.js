import React, { Component } from 'react'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { 
  fetchingCitiesSelector, 
  recentChecksSelector
} from '../selectors/citySelector';
import WeatherInfoTable from '../components/WeatherInfoTable';
import WithErrors from '../hocs/WithErrors'
import '../styles/cover.scss'

class ReactChecks extends Component {
  render() {
    return (
      <div className="text-center">
      <div className="cover-container">
           <main role="main" className="inner cover">
           {
            this.props.recentChecksData.map((city, index) => 
              <WeatherInfoTable 
                oneCityWeather={city} 
                recentChecksData={this.props.recentChecksData}
                hideRecentChecks
                hideRememberButton
                minimalisticVersion
                key={index}
              />)
            }
           </main>
        </div>
      </div>
    );
  }
  
}


const mapStateToProps = createStructuredSelector({
  fetching: fetchingCitiesSelector(),
  recentChecksData: recentChecksSelector(),
})

export default compose(
  WithErrors,
  connect(mapStateToProps),
)(ReactChecks)
