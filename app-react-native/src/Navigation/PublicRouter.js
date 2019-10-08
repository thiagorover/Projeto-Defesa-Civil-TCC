import { StackNavigator } from 'react-navigation'
import Login from '../Containers/Login'
import Cadastro from '../Containers/Cadastro'

const PublicRouter = StackNavigator({
  Login: {
    screen: Login
  },
  Cadastro: {
    screen: Cadastro
  }
}, {
  headerMode: 'none'
})

export default PublicRouter
