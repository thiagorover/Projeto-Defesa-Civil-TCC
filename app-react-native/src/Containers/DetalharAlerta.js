import React, { Component } from 'react'
import { Screen, View, NavigationBar, Tile, Image, Title, Heading, Text, Caption, Divider, TouchableOpacity, Icon } from '@shoutem/ui'
import { DateFormat } from '../Services'
import { connect } from 'react-redux'
import { fetchAlert } from '../Actions'
import { ApplicationStyle, Images } from '../Themes'
import Header from '../Components/Header'

class DetalharAlerta extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="notifications" style={{ color: tintColor }} />
  };

  componentDidMount() {
    this.props.fetchAlert(this.props.navigation.state.params.id);
  }

  render () {
    const { alerta } = this.props;

    if (!alerta) return <Text styleName="h-center v-center">Carregando...</Text>

    return (
      <Screen styleName="paper">
        <Image
          source={Images.mockup}
          style={{ width: 375, height: 210 }}
        >
          <NavigationBar
            styleName="clear"
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ListarAlertas')} style={{padding: 25}}>
                <Icon name="back" style={{color: '#fff'}} />
              </TouchableOpacity>
            }
            centerComponent={<Title></Title>}
          />
        </Image>
        <Divider />
        <Heading styleName="h-center">{alerta.description}</Heading>
        <Tile clear>
          <View styleName="content">
            <Text>{alerta.detail}</Text>
            <Caption>Publicado em: {DateFormat(alerta.created_at)}</Caption>
          </View>
        </Tile>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return { alerta: state.alertas.selected };
};

export default connect(mapStateToProps, { fetchAlert })(DetalharAlerta);
