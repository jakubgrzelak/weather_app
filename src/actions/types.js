import { createActionTypes } from '../utils'

export const ITEM = createActionTypes('ITEM', [
  'GET',
  'GET_ONE',
  'SAVE',
  'PUT',
  'PATCH',
  'DELETE',
  'SUCCESS',
  'FAILURE',
])

export const CITY = createActionTypes('ITEM', [
  'SAVE_OPTIONAL_CITIES',
  'ONE_CITY_WEATHER_REQUEST',
  'ONE_CITY_WEATHER_SUCCESS',
  'ONE_CITY_WEATHER_FAILURE',
  'REMEMBER_CITY',
])

export default ITEM
