import { fromJS, List } from 'immutable'
import { CITY } from '../actions/types'
import { REHYDRATE } from 'redux-persist/constants'

const initialState = fromJS({
  data: new List([]),
  optionalCities: new List([]),
  fetching: false,
  success: false,
  error: null,
  oneCityWeather: null,
  rememberCity: null, 
  recentChecks : new List([]),
})

export default function cityReducer(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
        return state
    case CITY.SAVE_OPTIONAL_CITIES:
      return state.merge(action.payload)
    case CITY.ONE_CITY_WEATHER_REQUEST: 
      return state.merge(action.payload)
    case CITY.ONE_CITY_WEATHER_SUCCESS: 
      let updatedRecentChecks = state;
      if (!action.payload.elementExistInRecentChecks) {
        updatedRecentChecks = state.update('recentChecks', recentChecks => recentChecks.unshift(action.payload.oneCityWeather));
      }
      return updatedRecentChecks.merge(action.payload)
    case CITY.REMEMBER_CITY: 
      return state.merge(action.payload)
    default:
      return state
  }
}
