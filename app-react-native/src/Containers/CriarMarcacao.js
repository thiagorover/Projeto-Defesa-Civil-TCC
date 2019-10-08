import React, { Component } from 'react'
import { ScrollView, Modal, FlatList } from 'react-native'
import { Screen, View, Row, TextInput, Overlay, TouchableOpacity, Image, Button, NavigationBar, Tile, Title, Subtitle, Text, Divider, Caption, Icon } from '@shoutem/ui'
import { connect } from 'react-redux'
import { ApplicationStyle, Images } from '../Themes'
import { createMark } from '../Actions'
import { Marcacoes } from '../Services'
import Header from '../Components/Header'

class CriarMarcacao extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="take-a-photo" style={{ color: tintColor }} />
  };

  constructor(props) {
    super(props)

    this.state = {
      descricao: '',
      markup: 1,
      latitude: null,
      longitude: null,
      error: null,
      marcacaoSelecionada: null,
      modalVisible: false,
      tipo: {
        title: null,
        bgColor: '#fff'
      }
    }

    let m = Marcacoes.find(e => e.id == 1)

    this.state.marcacaoSelecionada = m;

    this.setTipo.bind(this)
    this.handleSubmit.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  handleSubmit() {
    let mark = {
      description: this.state.descricao,
      markup_type_id: this.state.markup,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    }

    this.props.createMark(mark)
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  setTipo(marcacao) {
    this.setState({
      markup: marcacao.id,
      marcacaoSelecionada: marcacao
    })

    this.setModalVisible(!this.state.modalVisible)
  }

  renderRow ({item}) {
    return (
      <TouchableOpacity
        key={item.title}
        onPress={() => this.setTipo(item)}
      >
        <Image
          styleName="large-banner"
          source={item.defaultImage}
        >
          <Tile>
            <Overlay styleName="secondary">
              <Title>{item.title}</Title>
            </Overlay>
          </Tile>
        </Image>
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('Fechou o modal')}
        >
          <Screen>
            <Button styleName="secondary" onPress={() => this.setModalVisible(!this.state.modalVisible)}>
              <Icon name="close" />
              <Text>Fechar</Text>
            </Button>
            <FlatList
              data={Marcacoes}
              renderItem={this.renderRow.bind(this)}
              keyExtractor={this.keyExtractor}
              initialNumToRender={this.oneScreensWorth}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              ListEmptyComponent={this.renderEmpty}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </Screen>
        </Modal>

        <ScrollView>
          <Image
            source={Images.default}
            style={{ width: 375, height: 190 }}
          >
            <NavigationBar
              styleName="clear"
              centerComponent={<Title></Title>}
            />

            <Button onPress={() => this.props.navigation.navigate('CameraPrincipal')}>
              <Icon name="take-a-photo" />
              <Text>Adicionar imagem</Text>
            </Button>
          </Image>

          <View style={ApplicationStyle.defaultPadding}>
            <TextInput placeholder="Descrição" value={this.state.descricao} onChangeText={descricao => this.setState({descricao})} />
            <Divider />
            <Button
              styleName="border"
              style={{backgroundColor: this.state.tipo.bgColor}}
              onPress={() => this.setModalVisible(true)}
            >
              <Text>Tipo: {this.state.marcacaoSelecionada.title}</Text>
            </Button>
            <Divider />
            <Button styleName="secondary" onPress={() => this.handleSubmit()}>
              <Icon name="plus-button" />
              <Text>ADICIONAR MARCAÇÃO</Text>
            </Button>
          </View>
        </ScrollView>
      </Screen>
    )
  }
}

export default connect(null, { createMark })(CriarMarcacao)
