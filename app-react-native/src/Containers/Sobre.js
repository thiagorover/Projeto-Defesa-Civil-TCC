import React, { Component } from 'react'
import { Screen, View, Title } from '@shoutem/ui'
import { ApplicationStyle } from '../Themes'
import Header from '../Components/Header'

class Sobre extends Component {
  render() {
    return (
      <Screen>
        <Header title="Sobre" navigation={this.props.navigation} back="Configuracoes" />
        <View style={ApplicationStyle.defaultPadding}>
          <Title styleName="multiline h-center">Aplicativo para a Defesa Civil de Joinville - SC para que a população consiga obter informações e publicar dados referentes a catástrofes naturais de maneira colaborativa.</Title>
        </View>
      </Screen>
    )
  }
}

export default Sobre
