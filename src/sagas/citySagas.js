// In case you need to use a selector
// import also select from redux-saga/effects
// and then simplie yield select(yourSelector())
//
// In case you need to redirect to whatever route
// import { push } from react-router-redux and then
// yield put(push('/next-page'))

import {
  put, call, takeLatest, all,
} from 'redux-saga/effects'
import axios from 'axios'

import { CITY } from '../actions/types'

import { city } from '../actions'
require('dotenv').config();

function* handleGetOneCityWeather(action) {
  try {
    const id = action.payload.id;
    const elementExistInRecentChecks = action.payload.elementExistInRecentChecks
    const { data } = yield call(
      axios.get, 
      `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    )
    yield put(city.oneCityWeatherSuccess({ oneCityWeather: data, elementExistInRecentChecks }))
  } catch (e) {
    yield put(city.oneCityWeatherFailure({ error: { ...e } }))
  }
}

// function* handleGetOne(action) {
//   try {
//     const { id } = action.payload
//     const { data } = yield call(axios.get, `https://jsonplaceholder.typicode.com/posts/${id}`)
//     yield put(item.success({ data }))
//   } catch (e) {
//     yield put(item.failure({ error: { ...e } }))
//   }
// }

// function* handlePost(action) {
//   try {
//     const { saveData } = action.payload
//     const { data } = yield call(axios.post, 'https://jsonplaceholder.typicode.com/posts/', { saveData })
//     yield put(item.success({ data }))
//   } catch (e) {
//     yield put(item.failure({ error: { ...e } }))
//   }
// }

// function* handlePut(action) {
//   try {
//     const { id, updateData } = action.payload
//     const { data } = yield call(axios.put, `https://jsonplaceholder.typicode.com/posts/${id}`, { updateData })
//     yield put(item.success({ data }))
//   } catch (e) {
//     yield put(item.failure({ error: { ...e } }))
//   }
// }

// function* handlePatch(action) {
//   try {
//     const { id, updateData } = action.payload
//     const { data } = yield call(axios.patch, `https://jsonplaceholder.typicode.com/posts/${id}`, { updateData })
//     yield put(item.success({ data }))
//   } catch (e) {
//     yield put(item.failure({ error: { ...e } }))
//   }
// }

// function* handleDelete(action) {
//   try {
//     const { id } = action.payload
//     const { data } = yield call(axios.delete, `https://jsonplaceholder.typicode.com/posts/${id}`)
//     yield put(item.success({ data }))
//   } catch (e) {
//     yield put(item.failure({ error: { ...e } }))
//   }
// }

function* watchCitySagas() {
  yield all([
    takeLatest(CITY.ONE_CITY_WEATHER_REQUEST, handleGetOneCityWeather),
  ])
}

export default watchCitySagas
