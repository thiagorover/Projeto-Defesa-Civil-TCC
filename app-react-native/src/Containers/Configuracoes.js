import React, { Component } from 'react'
import { SectionList } from 'react-native'
import { Screen, TouchableOpacity, View, Row, Subtitle, Text, Divider, Caption, Icon } from '@shoutem/ui'
import Header from '../Components/Header'
import { ApplicationStyle, Images } from '../Themes'

class Configuracoes extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="settings" style={{ color: tintColor }} />
  };

  state = {
    data: [{
      key: 'Perfil',
      data: [{
        icon: 'notifications',
        title: 'Receber notificações',
        action: () => alert('q')
      }]
    }, {
      key: 'Informações',
      data: [{
        icon: 'users',
        title: 'Desenvolvedores',
        action: () => this.props.navigation.navigate('Desenvolvedores')
      }, {
        icon: 'about',
        title: 'Sobre',
        action: () => this.props.navigation.navigate('Sobre')
      }]
    }, {
      key: 'App',
      data: [{
        icon: 'exit-to-app',
        title: 'Sair',
        action: () => this.props.navigation.navigate('Login')
      }]
    }]
  }

  renderItem ({section, item}) {
    return (
      <TouchableOpacity onPress={() => item.action()}>
        <Row styleName="small">
          <Icon name={item.icon} />
          <View styleName="vertical">
            <Subtitle>{item.title}</Subtitle>
          </View>
        </Row>
      </TouchableOpacity>
    )
  }

  renderSectionHeader ({section}) {
    return (
      <Divider styleName="section-header">
        <Caption>{section.key}</Caption>
      </Divider>
    )
  }

  renderHeader = () => null

  renderFooter = () => null

  renderSectionFooter = () => null

  renderEmpty = () =>
    <Text>Nenhuma informação encontrada</Text>

  renderSeparator = () => null

  renderSectionSeparator = () => null

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render () {
    return (
      <Screen>
        <Header title="CONFIGURAÇÕES" />
        <SectionList
          renderSectionHeader={this.renderSectionHeader}
          sections={this.state.data}
          data={this.state.dataObjects}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          SectionSeparatorComponent={this.renderSectionSeparator}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
          renderSectionFooter={this.renderSectionFooter}
        />
      </Screen>
    )
  }
}

export default Configuracoes
