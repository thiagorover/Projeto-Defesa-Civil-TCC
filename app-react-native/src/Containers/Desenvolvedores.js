import React, { Component } from 'react'
import { SectionList } from 'react-native'
import { Screen, TouchableOpacity, View, Row, Subtitle, Text, Divider, Caption, Icon } from '@shoutem/ui'
import Header from '../Components/Header'
import { ApplicationStyle, Images } from '../Themes'

class Desenvolvedores extends Component {

  state = {
    data: [
      {
        key: 'APP',
        data: [
          {
            nome: 'Guilherme Souza',
            github: '@teste123'
          }
        ]
      }, {
        key: 'API',
        data: [
          {
            nome: 'Wander Kpote',
            github: '@teste123'
          }
        ]
      }, {
        key: 'Ferramentas administrativas',
        data: [
          {
            nome: 'Guilherme',
            github: '@teste123'
          }, {
            nome: 'Mateus',
            github: '@teste123'
          }
        ]
      }
    ]
  }

  renderItem ({section, item}) {
    return (
      <Row styleName="small">
        <View styleName="vertical">
          <Subtitle>{item.nome}</Subtitle>
          <Text>{item.github}</Text>
        </View>
      </Row>
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
        <Header title="DEVs" navigation={this.props.navigation} back="Configuracoes" />
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

export default Desenvolvedores
