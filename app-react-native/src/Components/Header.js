import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, NavigationBar, TouchableOpacity, Icon, Title, Text } from '@shoutem/ui'
import { ApplicationStyle } from '../Themes'

export default class Header extends Component {
  static defaultProps = {
    title: 'Título',
    navigation: null,
    back: false
  }

  constructor(props) {
    super(props);

    this.getLeftComponent.bind(this)
  }

  getLeftComponent() {
    const { back, navigation } = this.props;
    if (back) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate(back)} style={{padding: 25}}>
          <Icon name="back" />
        </TouchableOpacity>
      )
    }

    return null;
  }

  render () {
    const { title } = this.props;

    return (
      <View style={HeaderStyle.container}>
        <NavigationBar
          styleName="no-border"
          leftComponent={this.getLeftComponent()}
          centerComponent={<Title>{title}</Title>}
        />
      </View>
    )
  }
}

const HeaderStyle = {
  container: {
    height: 70
  }
}
