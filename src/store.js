import { fromJS } from 'immutable'
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import localForage from 'localforage';
import { createFilter } from '@actra-development-oss/redux-persist-transform-filter-immutable';
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from './reducers'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

const sagaMiddleware = createSagaMiddleware();

const saveOnlyOneCityWeather= createFilter(
  'cities',
  ['rememberCity', 'recentChecks']
);

const persistConfig = {
  key: 'root',
  localForage,
  whitelist: ['cities'],
  transforms: [
    saveOnlyOneCityWeather,
  ]
}

const configureStore = (initialState = {}, history) => {
  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
    : compose

  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
    autoRehydrate(),
  ]

  const store = createStore(
    rootReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  )

  window.persistor = persistStore(store, persistConfig)

  store.runSaga = sagaMiddleware.run
  store.asyncReducers = {}
  store.close = () => store.dispatch(END)

  if (module.hot) {
    // Enable webpack hot module replacement for reducers
    module.hot.accept(
      './reducers',
      () => {
        import('./reducers').then(reducerModule => {
          const createReducers = reducerModule.default
          const nextReducers = createReducers(store.asyncReducers)
          store.replaceReducer(nextReducers)
        })
      },
    )
  }

  return { store }
}

export default configureStore
