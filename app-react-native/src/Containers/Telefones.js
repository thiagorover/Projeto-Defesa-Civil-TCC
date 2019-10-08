import React, { PureComponent } from 'react'
import { FlatList } from 'react-native'
import { Screen, View, Row, TouchableOpacity, Subtitle, Text, Icon } from '@shoutem/ui'
import { ApplicationStyle, Images } from '../Themes'
import { OpenLink } from '../Services'
import Header from '../Components/Header'

class Telefones extends PureComponent {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="call" style={{ color: tintColor }} />
  };

  state = {
    dataObjects: [
      {description: 'Defesa Civil', phone: '(47) 3232-3232'},
      {description: 'Samu', phone: '(47) 3232-3232'},
      {description: 'Bombeiros voluntários', phone: '(47) 3232-3232'},
      {description: 'Policia civíl', phone: '(47) 3232-3232'}
    ]
  }

  renderRow ({item}) {
    return (
      <TouchableOpacity onPress={() => OpenLink('tel:' + item.phone)}>
      <Row styleName="small">
        <Icon name="call" />
        <View styleName="vertical">
          <Subtitle>{item.description}</Subtitle>
          <Text numberOfLines={1}>{item.phone}</Text>
        </View>
        <Icon styleName="disclosure" name="right-arrow" />
      </Row>
      </TouchableOpacity>
    )
  }

  renderHeader = () => null

  renderFooter = () => null

  renderEmpty = () =>
    <Text>Nenhuma informação encontrada</Text>

  renderSeparator = () => null

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render () {
    return (
      <Screen>
        <Header title="TELEFONES" />
        <View style={ApplicationStyle.defaultPadding}>
          <Text>Em caso de emergência, utilize esses telefones.</Text>
        </View>
        <FlatList
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </Screen>
    )
  }
}

export default Telefones
