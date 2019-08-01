import { createAction } from '../utils'
import { CITY } from './types'

export const city = {
  saveOptionalCities: optionalCities => createAction(CITY.SAVE_OPTIONAL_CITIES, {
    optionalCities,
  }),
  oneCityWeatherRequest: ({ id, elementExistInRecentChecks }) => createAction(CITY.ONE_CITY_WEATHER_REQUEST, { 
    id, 
    fetching: true,
    elementExistInRecentChecks
  }),
  oneCityWeatherSuccess: ({ oneCityWeather, elementExistInRecentChecks }) => createAction(CITY.ONE_CITY_WEATHER_SUCCESS, { 
    oneCityWeather,
    elementExistInRecentChecks,
    fetching: false,
  }),
  oneCityWeatherFailure: ({ error }) => createAction(CITY.ONE_CITY_WEATHER_FAILURE, { error }),
  rememberCity: rememberCity => createAction(CITY.REMEMBER_CITY, { rememberCity }),
}

export default city