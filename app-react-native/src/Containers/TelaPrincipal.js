import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Screen, Text, Icon } from '@shoutem/ui'
import { bindActionCreators } from 'redux'
import { fetchMarks } from '../Actions'
import MapaPrincipal from '../Components/MapaPrincipal'
import Header from '../Components/Header'

class TelaPrincipal extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => <Icon name="address" style={{ color: tintColor }} />
  };

  constructor(props) {
    super(props)

    this.state = {
      fetcher: null
    }
  }

  componentDidMount() {
    let fetcher = setInterval(() => this.props.fetchMarks(), 10000);
    this.setState({fetcher})
  }

  componentWillUnmount() {
    this.clearInterval(this.state.fetcher);
  }

  render () {
    const { marcacoes } = this.props;

    if (!marcacoes) return <Text>Carregando</Text>

    return (
      <Screen>
        <MapaPrincipal marcacoes={marcacoes} navigation={this.props.navigation} />
        <Header title="MAPA" />
      </Screen>
    )
  }
}


const mapStateToProps = (state) => {
  return { marcacoes: state.marcacoes.all };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchMarks }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TelaPrincipal);
