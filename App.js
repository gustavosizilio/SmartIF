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
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerActions,
} from 'react-navigation';
import Login from './login/AppLogin';
import Home from './login/AppHome';
import Mapa from './mapa/AppMapa';

const TelasDrawer = createDrawerNavigator(
    {
        Home: { screen: Home },
        Mapa: { screen: Mapa },
    }
);

const TelasStack = createStackNavigator(
    {
        DrawerStack: { screen: TelasDrawer },
    }, 
    {
        headerMode: 'float',
        navigationOptions: ({navigation}) => ({
            title: 'SmartIF',
            headerLeft: <Text onPress={() => { 
                navigation.dispatch(DrawerActions.toggleDrawer())
            }}>Menu</Text>
        })
    }
);

const TelasAuth = createSwitchNavigator(
    {
      Auth: Login,
      App: TelasStack,
    }
);

export default class App extends Component {
  render() {
    return (
      <TelasAuth />
    );
  }
  
}

