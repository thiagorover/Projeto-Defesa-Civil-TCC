import React, { Component } from 'react'
import { Screen, View, Button, Text, Divider, Image, TextInput } from '@shoutem/ui'
import { ApplicationStyle, Images } from '../Themes'
import { connect } from 'react-redux'
import { createUser } from '../Actions'

class Cadastro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nome: null,
      email: null,
      senha: null
    }

    this.cadastrar.bind(this)
  }

  cadastrar() {
    const user = {
      name: this.state.nome,
      email: this.state.email,
      password: this.state.senha,
      profile: 1 // Usuário comum
    }

    this.props.createUser(user)
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
            <TextInput placeholder="Nome" value={this.state.nome} onChangeText={nome => this.setState({nome})} />
            <Divider />
            <TextInput placeholder="E-mail" keyboardType="email-address" value={this.state.email} onChangeText={email => this.setState({email})} />
            <Divider />
            <TextInput placeholder="Senha" secureTextEntry keyboardType="numbers-and-punctuation" value={this.state.senha} onChangeText={senha => this.setState({senha})} />
            <Divider />
            <View styleName="horizontal">
              <Button onPress={() => this.cadastrar()} styleName="full-width secondary">
                <Text>Cadastre-se</Text>
              </Button>
            </View>
          </View>
        </Image>
      </Screen>
    )
  }
}

export default connect(null, { createUser })(Cadastro)
