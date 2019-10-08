import { Linking } from 'react-native'

const OpenLink = link => {
  Linking.canOpenURL(link).then(support => {
    if (support) {
      Linking.openURL(link)
    }
  })
}

export default OpenLink
