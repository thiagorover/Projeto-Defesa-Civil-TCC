import React, { Component } from 'react'
import { Screen, View, Button, Text, Divider, Image, TextInput } from '@shoutem/ui'
import { ApplicationStyle, Images } from '../Themes'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      senha: null
    }

    this.doLogin.bind(this)
  }

  doLogin() {
    const user = {
      email: this.state.email,
      password: this.state.senha
    }
  }

  render () {
    return (
      <Screen>
        <Image
          styleName="large-square"
          style={ApplicationStyle.container}
          source={Images.loginBg}
        >
          <View styleName="fill-parent vertical v-center" style={ApplicationStyle.defaultPadding}>
            <Image style={{alignSelf: 'center'}} styleName="medium-square" source={Images.logo} />
            <Divider />
            <TextInput placeholder="E-mail" value={this.state.email} onChangeText={email => this.setState({email})} />
            <Divider />
            <TextInput placeholder="Senha" value={this.state.senha} onChangeText={senha => this.setState({senha})} />
            <Divider />
            <View styleName="horizontal">
              <Button onPress={() => this.props.navigation.navigate('TelaPrincipal')} styleName="full-width">
                <Text>Login</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('Cadastro')} styleName="full-width secondary">
                <Text>Cadastre-se</Text>
              </Button>
            </View>
          </View>
        </Image>
      </Screen>
    )
  }
}

export default Login
