import React, { Component } from 'react'
import { AppRegistry, Dimensions } from 'react-native'
import { View, Text, Button, Icon } from '@shoutem/ui'
import Camera from 'react-native-camera'

class CameraPrincipal extends Component {
  static navigationOptions = {
    tabBarComponent: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Button styleName="secondary" onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Icon name="take-a-photo" />
            <Text>Capturar Imagem</Text>
          </Button>
        </Camera>
      </View>
    )
  }

  takePicture() {
    const options = {}
    this.camera.capture({metadata: options})
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    margin: 40
  }
}

export default CameraPrincipal
