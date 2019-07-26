import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import '../styles/cover.scss'

import {
  exampleDataSelector,
  fetchingSelector,
} from '../selectors/exampleSelector'

import { item } from '../actions'
import LoadingAnimation from '../components/LoadingAnimation'
import WithErrors from '../hocs/WithErrors'

class ExampleContainer extends Component {
  static propTypes = {
    exampleData: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
    fetching: PropTypes.bool,
    loadOne: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fetching: false,
  };

  componentDidMount() {
    const { loadOne } = this.props
    loadOne('1')
  }

  render() {
    const { exampleData, fetching } = this.props

    // if (fetching) return <LoadingAnimation />

    return (
      <div className="text-center">
        <div className="cover-container">
          <main role="main" className="inner cover">
            <h1 className="cover-heading">Are you curious what is the weather like?</h1>
              <p className="lead">
                Find your desired city and check if it is worth to come out or if this is a good day for a morning run.
              </p>
            <p className="lead">
              <a href="#" className="btn btn-lg btn-secondary">Learn more</a>
            </p>
          </main>
        
          <footer className="mastfoot mt-auto">
            <div className="inner">
              <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  exampleData: exampleDataSelector(),
  fetching: fetchingSelector(),
})

const mapDispatchToProps = {
  loadOne: item.requestOne,
}

export default compose(
  WithErrors,
  connect(mapStateToProps, mapDispatchToProps),
)(ExampleContainer)
