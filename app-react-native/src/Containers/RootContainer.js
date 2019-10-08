import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import SplashScreen from 'react-native-splash-screen'

class RootContainer extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

export default RootContainer
