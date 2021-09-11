import React, { Component } from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'
import MovieLibrary from './MovieLibrary'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MovieLibrary />
      </Provider>
    )
  }
}

export default App
