/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator,
  DrawerNavigator,
  SwitchNavigator,
  DrawerActions,
} from 'react-navigation';
import Login from './login/AppLogin';
import Home from './login/AppHome';
import Mapa from './mapa/AppMapa';
import App2 from './App2';

const TelasAuth = SwitchNavigator(
    {
      Auth: Login,
      App2: App2,
    }
);

export default class App extends Component {
  render() {
    return (
      <TelasAuth />
    );
  }

}
