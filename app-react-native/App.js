import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'
import reducers from './src/Reducers'
import thunk from 'redux-thunk'
import RootContainer from './src/Containers/RootContainer'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore)
const store = createStoreWithMiddleware(reducers)

class App extends Component<{}> {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
