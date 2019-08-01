import { combineReducers } from 'redux-immutable'
import routeReducer from './routeReducer'
import cityReducer from './cityReducer'

const rootReducer = asyncReducers => combineReducers({
  route: routeReducer,
  cities: cityReducer,
  ...asyncReducers,
})

export default rootReducer
