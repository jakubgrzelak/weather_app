import React from 'react'
import { compose } from 'recompose'
import { Route, Switch, withRouter } from 'react-router-dom'
import WithErrors from './hocs/WithErrors'
import Homepage from './containers/Homepage'
import RecentChecks from './containers/RecentChecks';
import Header from './components/Header';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/recent-checks" component={RecentChecks} />
      <Route exact path="/" component={Homepage} />
    </Switch>
  </div>
)

export default compose(
  WithErrors,
  withRouter,
)(App)
