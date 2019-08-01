import { createSelector } from 'reselect'

const citiesState = state => state.get('cities')

const optionalCitiesSelector = () => createSelector(
  citiesState,
  state => {
    const optionalCities = state.get('optionalCities')

    return optionalCities;
  },
)

const fetchingCitiesSelector = () => createSelector(
  citiesState,
  state => {
    const fetching = state.get('fetching')

    return fetching;
  },
)

const oneCityWeatherSelector = () => createSelector(
  citiesState,
  state => {
    const oneCityWeather = state.get('oneCityWeather')
    return oneCityWeather;
  }
)

const rememberCitySelector = () => createSelector(
  citiesState,
  state => {
    const rememberCity = state.get('rememberCity')
    return rememberCity;
  }
)

const recentChecksSelector = () => createSelector(
  citiesState,
  state => {
    const recentChecks = state.get('recentChecks')
    return recentChecks;
  }
)

export {
  optionalCitiesSelector,
  fetchingCitiesSelector,
  oneCityWeatherSelector,
  rememberCitySelector,
  recentChecksSelector,
}
