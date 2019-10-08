import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'

import LoggedRouter from './LoggedRouter'
import PublicRouter from './PublicRouter'

const Router = StackNavigator({
  Public: {
    screen: PublicRouter
  },
  Logged: {
    screen: LoggedRouter
  }
}, {
  headerMode: 'none'
})

export default Router
