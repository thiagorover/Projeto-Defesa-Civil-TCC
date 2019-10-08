import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { fetchMark, doVote } from '../Actions';
import { Screen, View, Row, Lightbox, Heading, TextInput, Image, Tile, Overlay, Button, TouchableOpacity, NavigationBar, Title, Subtitle, Text, Divider, Caption, Icon } from '@shoutem/ui'
import { ApplicationStyle, Images } from '../Themes'
import { DateFormat, GetMarcacao } from '../Services'

class DetalharMarcacao extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="address" style={{ color: tintColor }} />
  };

  constructor(props) {
    super(props)

    this.onVote.bind(this)
  }

  componentDidMount() {
    this.props.fetchMark(this.props.navigation.state.params.id);
  }

  onVote(markup_id, type) {
    let vote = {
      markup_id: this.props.mark.id,
      type: type
    }

    this.props.doVote(vote)
  }

  render () {
    const { mark } = this.props;

    if (!mark) return <Text>Carregando</Text>

    const markerType = GetMarcacao(mark.markup_type_id)

    return (
      <Screen>
        <ScrollView>
        <Image
          source={Images.mockup}
          style={{ width: 375, height: 190 }}
        >
          <NavigationBar
            styleName="clear"
            leftComponent={
              <TouchableOpacity onPress={() => this.props.navigation.navigate('TelaPrincipal')} style={{padding: 25}}>
                <Icon name="back" style={{color: '#fff'}} />
              </TouchableOpacity>
            }
            centerComponent={<Title></Title>}
          />
        </Image>
        <Row>
          <Heading>{mark.description}</Heading>
        </Row>
        <Divider styleName="section-header">
          <Caption>Tipo:</Caption>
        </Divider>
        <Row styleName="small">
          <Icon name="add-to-favorites-off" />
          <Text>{markerType.title}</Text>
        </Row>
        <Divider styleName="section-header">
          <Caption>Informado por:</Caption>
        </Divider>
        <Row styleName="small">
          <Image
            styleName="small-avatar"
            source={{ uri: 'https://poshare.com/img/man.png' }}
          />
          <View styleName="vertical">
            <Subtitle>Guilherme Souza</Subtitle>
            <Text>{DateFormat(mark.created_at)}</Text>
          </View>
        </Row>
        <Divider styleName="section-header">
          <Caption>Continua alagado?</Caption>
        </Divider>
        <View styleName="horizontal flexible">
          <Button styleName="full-width" onPress={() => this.onVote(mark.markup_id, 1)}>
            <Icon name="checkbox-on" />
            <Text>Sim</Text>
          </Button>
          <Button styleName="secondary full-width" onPress={() => this.onVote(mark.markup_id, 0)}>
            <Icon name="clear-text" />
            <Text>Não</Text>
          </Button>
        </View>
        </ScrollView>
      </Screen>
    )
  }
}

const mapStateToProps = (state) => {
  return { mark: state.marcacoes.selected };
};

export default connect(mapStateToProps, { fetchMark, doVote })(DetalharMarcacao);
