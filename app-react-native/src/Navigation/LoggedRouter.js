import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'

import TelaPrincipal from '../Containers/TelaPrincipal'
import ListarAlertas from '../Containers/ListarAlertas'
import CriarMarcacao from '../Containers/CriarMarcacao'
import CameraPrincipal from '../Containers/CameraPrincipal'
import Configuracoes from '../Containers/Configuracoes'

import Telefones from '../Containers/Telefones'
import DetalharMarcacao from '../Containers/DetalharMarcacao'
import DetalharAlerta from '../Containers/DetalharAlerta'
import Desenvolvedores from '../Containers/Desenvolvedores'
import Sobre from '../Containers/Sobre'

const LoggedRouter = TabNavigator({
  MapaTab: {
    screen: StackNavigator({
      TelaPrincipal: { screen: TelaPrincipal },
      DetalharMarcacao: { screen: DetalharMarcacao }
    }, {
      headerMode: 'none'
    })
  },
  AlertasTab: {
    screen: StackNavigator({
      ListarAlertas: { screen: ListarAlertas },
      DetalharAlerta: { screen: DetalharAlerta }
    }, {
      headerMode: 'none'
    })
  },
  MarcacaoTab: {
    screen: StackNavigator({
      CriarMarcacao: { screen: CriarMarcacao },
      CameraPrincipal: { screen: CameraPrincipal }
    }, {
      headerMode: 'none'
    })
  },
  TelefonesTab: { screen: Telefones },
  ConfiguracoesTab: {
    screen: StackNavigator({
      Configuracoes: { screen: Configuracoes },
      Desenvolvedores: { screen: Desenvolvedores },
      Sobre: { screen: Sobre }
    }, {
      initialRouteName: 'Configuracoes',
      headerMode: 'none'
    })
  }
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#007aff',
    style: { backgroundColor: '#fff' }
  },
  headerMode: 'none'
})

export default LoggedRouter
