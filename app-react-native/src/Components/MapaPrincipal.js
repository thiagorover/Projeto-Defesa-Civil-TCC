import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { Images, Metrics } from '../Themes'
import { GetMarcacao } from '../Services'

class MapaPrincipal extends React.Component {
  constructor (props) {
    super(props)

    const { marcacoes } = this.props;

    const region = {
      latitude: -26.2596768,
      longitude: -48.8548334,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    }

    this.state = {
      region,
      followsUserLocation: true,
      showUserLocation: true
    }

    this.renderMapMarkers = this.renderMapMarkers.bind(this)
  }

  renderMapMarkers (location) {
    return (
      <MapView.Marker
        key={location.id}
        style={defaultStyle.map}
        image={GetMarcacao(location.markup_type_id).icon}
        coordinate={{
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude)
        }}
        onPress={() => this.props.navigation.navigate('DetalharMarcacao', {
          id: location.id
        })}
      />
    )
  }

  render () {
    const { marcacoes } = this.props;

    return (
      <MapView
        followsUserLocation={this.state.followsUserLocation}
        initialRegion={this.state.region}
        onRegionChangeComplete={this.onRegionChange}
        showsUserLocation={this.state.showUserLocation}
        style={defaultStyle.map}
      >
        {marcacoes.map(location => this.renderMapMarkers(location))}
      </MapView>
    )
  }
}

const defaultStyle = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1
  }
})

export default MapaPrincipal

