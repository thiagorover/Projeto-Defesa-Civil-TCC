import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { Screen, NavigationBar, Icon, Image, Overlay, Tile, Title, Subtitle, Text, Divider, View, TouchableOpacity } from '@shoutem/ui'
import { DateFormat } from '../Services'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
/* Action creators */
import { fetchAlerts } from '../Actions'

import { ApplicationStyle, Images } from '../Themes'
import Header from '../Components/Header'

class ListarAlertas extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="notifications" style={{ color: tintColor }} />
  };

  constructor(props) {
    super(props)

    this.state = {
      fetcher: null,
      notifications: []
    }

    this.renderRow.bind(this)
  }

  componentDidMount() {
    let fetcher = setInterval(() => this.props.fetchAlerts(), 10000);
    this.setState({fetcher})
  }

  componentWillUnmount() {
    this.clearInterval(this.state.fetcher);
  }

  renderRow ({item}) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('DetalharAlerta', {
        id: item.id
      })}>
        <View>
          <Image
            styleName="large-banner"
            source={{ uri: `http://lorempixel.com/400/200/nature?test=${item.id}` }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{item.description}</Title>
              <Overlay styleName="solid-bright">
                <Subtitle styleName="sm-gutter-horizontal">{DateFormat(item.created_at)}</Subtitle>
              </Overlay>
            </Tile>
          </Image>
          <Divider styleName="line" />
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader = () =>
    <Text></Text>

  renderFooter = () => null

  renderEmpty = () =>
    <Text styleName="h-center v-center">Nenhuma informação encontrada</Text>

  renderSeparator = () => null

  keyExtractor = (item, index) => index

  oneScreensWorth = 20

  render () {
    const { alertas } = this.props;

    return (
      <Screen>
        <Header title="ALERTAS" />
        <FlatList style={{flex: 1}}
          data={alertas}
          renderItem={this.renderRow.bind(this)}
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

const mapStateToProps = state => {
  return { alertas: state.alertas.all };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchAlerts }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListarAlertas);
